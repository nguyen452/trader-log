import ReactQuill, {Quill} from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import React,  { useEffect, useRef } from 'react';

const TextEditor = ({ value, onChange }) => {
   Quill.register('modules/imageResize', ImageResize);
    const  modules  = {
        toolbar: [
            [{ font: [] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script:  "sub" }, { script:  "super" }],
            ["blockquote", "code-block"],
            [{ list:  "ordered" }, { list:  "bullet" }],
            [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
            ["link", "image", "video"],
            ["clean"],
        ],
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: [ "Resize", "DisplaySize" ],

        },
    };
    return (
     <div className='max-h-96 overflow-auto'>
           <ReactQuill  modules={modules} theme="snow" placeholder='Enter you journal log here' onChange={onChange} value={value} />
     </div>
    )
}

export default TextEditor;
