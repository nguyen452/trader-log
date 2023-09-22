import React from "react";
import { NavLink } from "react-router-dom";

const SideBarLink = ({ text, link, src }) => {
    return (
        <NavLink
            to={link}
            className= {`flex items-center w-32 h-8 text-slate-600 text-lg ${(isActive) =>{
                return isActive ? "text-blue-500" : ""
            }}`}
        >
            <img src={src} alt="icon" className="h-5 w-5 mr-4" />
            <p>{text}</p>
        </NavLink>
    )

};

export default SideBarLink;
