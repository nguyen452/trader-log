import React from "react";
import SignedInNavBar from "../layout/SignedInNavbar";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const SignedIn = () => {
    return (
        <div className="flex w-full">
            <aside>
                <Sidebar />
            </aside>
            <div className="w-full">
                <header>
                    <SignedInNavBar />
                </header>
                <main className="h-full bg-slate-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SignedIn;
