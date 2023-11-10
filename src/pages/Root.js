import React from "react";
// import Navbar from "../layout/Navbar";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Root = () => {
    return (
        <div className="flex flex-col h-screen">
            <header className="w-full">
                <Navbar />
            </header>

            <main className="flex-grow bg-slate-50">
                <Outlet />
            </main>

            <footer className="w-full">
                <Footer />
            </footer>
        </div>
    );
};

export default Root;
