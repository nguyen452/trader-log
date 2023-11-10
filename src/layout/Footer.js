import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-sky-900 text-white flex flex-col h-28 md-32 p-3">
            <div className="text-xl md:text-3xl flex-col font-bold flex items-center mb-6 ">
                <h2 className="">Contact Us</h2>
                <div className="flex h-12 w-32 justify-center items-center ">
                    <FacebookIcon className="flex-grow hover:bg-sky-800 hover:cursor-pointer" />
                    <TwitterIcon className="flex-grow hover:bg-sky-800 hover:cursor-pointer" />
                    <InstagramIcon className="flex-grow hover:bg-sky-800 hover:cursor-pointer" />
                </div>
                <div className="flex justify-between gap-4 px-4 text-xs md:text:sm font-light">
                    <div>
                        <p>© 2023 Trader Log</p>
                    </div>
                    <div className="flex gap-4">
                        <Link
                            to="/about"
                            className="hover:bg-sky-800 hover:cursor-pointer"
                        >
                            Terms of Service
                        </Link>
                        <Link
                            to="/about"
                            className="hover:bg-sky-800 hover:cursor-pointer"
                        >
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
