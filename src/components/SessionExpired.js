import React from "react";
import { Link } from "react-router-dom";

const SessionExpired = () => {
    return (
        <div className=" w-96 h-40 flex flex-col items-center justify-center rounded-2xl p-4 bg-white">
            <div className="w-full pb-4 flex flex-col border-b-2 border-slate-200 items-center justify-center gap-2">
                <h1 className="text-xl font-bold">Session Expired</h1>
                <h2 className="font-medium">Please log in again.</h2>
            </div>
            <Link className="text-blue-500 font-semibold pt-2 text-xl" to="/login">OK</Link>
        </div>
    );
};

export default SessionExpired;
