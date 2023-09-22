import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    <div>
        <div>
            <NavLink to="/import">Import</NavLink>
            <NavLink to="/export">Export</NavLink>
            <NavLink to="/calendar">Transactions</NavLink>
            <NavLink to="/import">Settings</NavLink>
        </div>
    </div>
}
