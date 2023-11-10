import React, { useState } from "react";


const Import = () => {
    const [broker, setBroker] = useState("");


    const handleChange = (e) => {
        setBroker(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = e.target.fileUpload.files[0];
        const formData = new FormData();
        formData.append("fileUpload", file);

        // send file to backend
        const upload = await fetch("http://localhost:4000/api/trades/import", {
            method: "POST",
            body: formData,
        });

        const response = await upload.json();
        if (response.status === "success") {
            console.log("file uploaded successfully");
        } else {
            console.log("file upload failed");
        }
    };

    return (
        <main className="h-full w-full p-8 flex text-slate-800 container mx-auto gap-8">
            <section className=" bg-white rounded-3xl shadow-md">
                <h2 className="text-3xl p-8">Please select your broker</h2>
                <select
                    className="bg-white border h-12 rounded-2xl text-slate-600 mx-8 px-4"
                    value={broker}
                    onChange={handleChange}
                    id="broker-select"
                >
                    <option value="" disabled>
                        Please choose your broker
                    </option>
                    <option value="Charles Schwab">Charles Schwab</option>
                    <option value="Interactive Broker">
                        Interactive Broker
                    </option>
                    <option value="Fidelity">Fidelity</option>
                    <option value="TD Ameritrade">TD Ameritrade</option>
                    <option value="Trade Zero">Trade Zero</option>
                    <option value="Robinhood">Robinhood</option>
                    <option value="Webull">Webull</option>
                </select>

                <article className="flex flex-col p-8 w-96">
                    <h1 className="text-lg font-semibold my-8">
                        TradeZero Trade History CSV Download
                    </h1>
                    <div class="step">
                        <h2 className=" font-medium my-4">Step 1</h2>
                        <p>
                            Log in to your TradeZero account via the APEX
                            Clearing website or the TradeZero website directly.
                        </p>
                    </div>
                    <div class="step">
                        <h2 className=" font-medium my-4">Step 2</h2>
                        <p>
                            Click on "MY ACCOUNT" and select "Account Overview".
                        </p>
                    </div>
                    <div class="step">
                        <h2 className=" font-medium my-4">Step 3</h2>
                        <p>
                            Scroll down to the "TRADES" section and enter a
                            start date and an end date for the report, then
                            click the "Search" button.
                        </p>
                    </div>
                    <div class="step">
                        <h2 className=" font-medium my-4">Step 4</h2>
                        <p>
                            After the report is displayed, click the "EXCEL"
                            button to download your trade report as a CSV file.
                        </p>
                    </div>
                </article>
            </section>
            <section className="bg-white w-full rounded-3xl shadow-md flex flex-col">
                <h2 className="font-normal text-3xl p-8">
                    Drag and Drop your file
                </h2>
                <div className="flex justify-center w-full">
                    <div className="border-dashed border-4 w-96">
                        <img
                            src="/folderUploadPic.png"
                            alt="cloudUploadIcon"
                            className="w-96 mx-auto"
                        ></img>
                    </div>
                </div>
                <h2 className="text-3xl p-8">
                    Select your file
                </h2>
                <input type='file' accept='.csv' name='fileUpload'></input>
                <button type="submit">Upload</button>
            </section>
        </main>
    );
};

export default Import;
{
    /* <section>
<form onSubmit={handleSubmit} className="flex flex-col">
    <label htmlFor='broker-select'>Choose your broker</label>
    <select value={broker} onChange={handleChange} id='broker-select' >
        <option value='' disabled>Please choose your broker</option>
        <option value='Charles Schwab'>Charles Schwab</option>
        <option value='Interactive Broker'>Interactive Broker</option>
        <option value='Fidelity'>Fidelity</option>
        <option value='TD Ameritrade'>TD Ameritrade</option>
        <option value= 'Trade Zero'>Trade Zero</option>
        <option value= 'Robinhood'>Robinhood</option>
        <option value= 'Webull'>Webull</option>
    </select>
    <input type='file' accept='.csv' name='fileUpload'></input>
    <button type="submit">Upload</button>
</form>
<p>{broker}</p>
</section> */
}
