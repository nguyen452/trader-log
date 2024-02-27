import React from "react";

const Modal = ({ open, children}) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center w-full">
            {children}
        </div>
    )
}

export default Modal;
