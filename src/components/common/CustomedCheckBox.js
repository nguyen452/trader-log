import React from "react";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";

const CustomedCheckBox = ({ label, name, onChange, isChecked, ...rest }) => {
    return (
        <div className="relative">
            <input
                type="checkbox"
                className="appearance-none w-6 h-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 focus:ring-opacity-50"
                onChange={onChange}
                {...rest}
            />
            {isChecked && (
                <CheckSharpIcon className="absolute top-0 left-0 w-6 h-6 text-white" />
            )}
            <label name={name}>{name}</label>
        </div>
    );
};

export default CustomedCheckBox;
