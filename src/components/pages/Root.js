import React from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <section className="flex">
            <Sidebar />
            <Navbar />
                <div>
                    <Outlet />
                </div>
        </section>
    );
};

export default Root;
