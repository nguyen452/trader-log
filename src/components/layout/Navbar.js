import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="flex h-30 items-center justify-between">
            <div id="logo" className="flex text-slate-600 text-2xl m-3 items-center border-b w-52">
                <img src="/traderLogo.svg" alt="logo" className="h-14 w-12" />
                <p>Trader Log</p>
            </div>
            <div id="nav-links" className="w-72 flex justify-between items-center ">
                <button className="bg-traderBlue text-white h-10 w-28 flex items-center justify-center rounded-xl hover:bg-blue-400 cursor-pointer">
                    <Link to="/home">home</Link>
                </button>
                <button className="bg-traderBlue text-white h-10 w-28 flex items-center justify-center rounded-xl hover:bg-blue-400  ">
                    <Link to="/import">Import</Link>
                </button>
                profile
            </div>
        </nav>
    )
};

export default Navbar;
