import React from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const BlueButton = ({ text, link, onClick, isLoading }) => {
    return (
        <button className="bg-traderBlue text-white h-10 w-28 flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointer shadow-md" onClick={onClick}>
            <Link to={link}>{isLoading ?
                <LoadingSpinner/> :
                text}
            </Link>
        </button>
    )
};

export default BlueButton;
