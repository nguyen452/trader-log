import React from "react";
import SignedInNavBar from "../layout/SignedInNavbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const SignedIn = () => {
    return (
        <div className="flex w-full h-full">
            <aside className="h-full">
                <Sidebar />
            </aside>
            <div className="w-full h-screen flex flex-col">
                <header>
                    <SignedInNavBar />
                </header>
                <main className=" h-full bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SignedIn;
