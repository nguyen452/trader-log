import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import clsx from "clsx";
import BlueButton from "../components/common/BlueButton";
import Modal from "../components/common/Modal";
import SessionExpired from "../components/SessionExpired";
const DropZone = () => {
    const [files, setFiles] =useState([]);
    const [fileExits, setFileExits] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [unauthorized, setUnauthorized] = useState(false);
    const [success, setSuccess] = useState(false)

    const handleUpload = async () => {
        setIsLoading(true);
        const formData = new FormData();
        files.forEach((file) => formData.append("fileUploads", file));
        try {
            // send file to backend
            const upload = await fetch("http://localhost:4000/api/trades/import", {
                method: "POST",
                credentials: 'include',
                body: formData,
            });
            if (upload.status === 401) {
                setUnauthorized(true);
                setIsLoading(false);
            }
            const response = await upload.json();
            if (response.status === "success") {
                setHasError(false);
                setSuccess(true);
                setIsLoading(false);

                console.log("file uploaded successfully");
            } else {
                console.log("file upload failed");
                setHasError(true);
                setSuccess(false)
            }
        } catch (error) {
            setHasError(true);
            setIsLoading(false);
            setSuccess(false);
            console.log("file upload failed with error: ", error);
        }
    };

    const onDrop = useCallback((acceptedFiles) => {
        // check if file is unique using find method if it finds something it will return the file object then we need to set it to false if it finds something and true if it doesn't find something
        let isFileUnique = files.find((file) => file.path === acceptedFiles[0].path);
        if (isFileUnique) {
            isFileUnique = false;
        } else {
            isFileUnique = true;
        }
        // if file is unique then set the state of files
        if (isFileUnique) {
            setFiles((prev) => {
                return [...prev, ...acceptedFiles]
            });
            setFileExits(false);
        } else {
            setFileExits(true);
        }

    }, [files]);

    const removeFile = (key) => {
        const updatedFiles = files.filter((file, index) => index !== key)
        setFiles(updatedFiles);
    }
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'text/html':['.csv']
        },
        // multiple: true
    });

    return (
        <div className="flex flex-col justify-center w-full">
            <div className= {clsx(
                // normal state
                "border-dashed border-4 xl:w-2/3 m-8 flex flex-col ",
                // error state
                {"border-red-500": fileExits}
            )} {...getRootProps()}>
                <input {...getInputProps()}/>
                <img
                    src="/folderUploadPic.png"
                    alt="cloudUploadIcon"
                    className="w-96 mx-auto p-4 "
                ></img>
                {
                    isDragActive ?

                    <p className="text-center text-slate-500 py-4">Drag 'n' drop the file here... </p> :
                    <p className="text-center text-slate-500 py-4">Drag 'n' drop the file here, or click to select files</p>
                }
                {fileExits && <p className="text-center text-red-500 py-2"><PriorityHighRoundedIcon /> File already exists, please select another file</p>}
            </div>
            <div>
                <h1 className="text-3xl px-8">Upload your trade history</h1>
                <p className="text-slate-500 px-8 my-2">Please upload your trade history in CSV format</p>
                <div className="border m-8 rounded-xl lg:w-2/3 ">
                    <h2 className="text-2xl p-4 ">Accepted file</h2>
                    {/* render only if there is a file */}
                    {files && files.map((file, index) => {
                        return (
                            <div className="flex gap-4 p-4 items-center" key={index}>
                                <img src="/file-type-excel.svg" alt="excel icon" className="h-8" />
                                <p className="h-8 flex items-center">{file.name}</p>
                                <div className=" h-6 w-6 flex items-center justify-center bg-slate-400 rounded-full hover:cursor-pointer hover:bg-slate-600" onClick={() => removeFile(index)}>
                                    <CloseRoundedIcon className="h-6 w-6 text-white" />
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="w-2/3 flex justify-center mx-8" >
                <BlueButton text="Upload" onClick={handleUpload} isLoading={isLoading} />
                </div>
                {/* success state */}
                {success && <p className="flex items-center text-green-500 px-8 py-2 gap-1" ><DoneAllIcon /> Successfully uploaded</p>}
                {/* error state */}
                {hasError && <p className="flex items-center text-red-500 px-8 py-2 gap-1"><PriorityHighRoundedIcon /> There was an error with uploading</p>}
                {/* unauthorized state */}
                <Modal open={unauthorized}>
                    <SessionExpired />
                </Modal>

            </div>
        </div>
    );
};

export default DropZone;
