import React from "react";
import { Link } from "react-router-dom";

const BlueButton = ({ text, link }) => {
    return (
        <button className="bg-traderBlue text-white h-10 w-28 flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointer shadow-md">
            <Link to={link}>{text}</Link>
        </button>
    )
};

export default BlueButton;
