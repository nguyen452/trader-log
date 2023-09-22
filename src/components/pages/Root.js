import React from "react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const Root = () => {
    return (
        <section>
            <Navbar />
            <div>
                {/* <Sidebar /> */}
                <div>
                    <Outlet />
                </div>
            </div>
        </section>
    );
};

export default Root;
