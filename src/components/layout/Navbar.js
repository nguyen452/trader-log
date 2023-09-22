import React from "react";
import { Link } from "react-router-dom";
import BlueButton from "../common/BlueButton";
import Profile from "./Profile";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="flex h-68px items-center justify-between w-screen border-b">
           <div className="flex items-center ml-3">
                <MdOutlineArrowBackIosNew className="text-3xl text-slate-600" />
           </div>
            <div id="nav-links" className="flex justify-between items-center w-500px ">
                <div id='buttons-container' className="flex justify-between w-64">
                    <BlueButton text="Home" link="/home" />
                    <BlueButton text="Import" link="/Import" />
                </div>
                <Profile/>
            </div>
        </nav>
    )
};

export default Navbar;
#7B8289
