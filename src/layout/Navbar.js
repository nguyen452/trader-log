import React, { useState } from "react";
import BlueButton from "../components/common/BlueButton";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="text-slate-600 flex bg-white w-full">
            <nav className=" container mx-auto flex h-14 items-center justify-between w-screen">
                <div className="flex items-center pl-1 md:mx-8">
                    <img src="/traderLogo.svg" alt="logo" className="h-14 w-12 " />
                    <p className="text-l font-semibold">Trader Log</p>
                </div>
                <div className="md:flex justify-center items-center md:gap-4 hidden">
                    <Link  to="/features">Features</Link>
                    <Link  to="/pricing">Pricing</Link>
                    <Link  to="/contact">Contact</Link>
                </div>
                {/* mobile menu */}
                <div className=" relative md:hidden ">
                    <MenuIcon fontSize="large" onClick={handleMenuClick} />
                    {/* dropbox for menu */}
                    {isMenuOpen &&
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none font-normal text-slate-500">
                                <div className="p-1 hover:bg-slate-50 hover:shadow-md text-sm">
                                    <Link className="block w-full"  to="/features">Features</Link>
                                </div>
                                <div className="p-1 hover:bg-slate-50  hover:shadow-md text-sm">
                                    <Link className="block w-full"  to="/pricing">Pricing</Link>
                                </div>
                                <div className="p-1 hover:bg-slate-50  hover:shadow-md text-sm">
                                    <Link className="block w-full"  to="/contact">Contact</Link>
                                </div>
                                <hr />
                                <div className="p-1 hover:bg-slate-50  hover:shadow-md text-sm">
                                    <Link className="block w-full"  to="/login">Login</Link>
                                </div>
                                <div className="p-1 hover:bg-slate-50  hover:shadow-md text-sm">
                                    <Link className="block w-full"  to="/sign-up">Sign up</Link>
                                </div>


                        </div>}
                </div>
                {/* medium size screen and above */}
                <div className="md:flex space-x-4 hidden">
                    <div className="flex items-center mr-3 ">
                        <Link to="/login">
                            <p className="text-xl mx-4">Login</p>
                        </Link>
                    </div>
                    <div className="flex items-center mr-3">
                            <BlueButton text="Sign up" link={"/sign-up"} />

                    </div>
                </div>
            </nav>
        </div>
    )
};

export default Navbar;
