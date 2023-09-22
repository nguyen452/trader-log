import React from "react";
import { NavLink } from "react-router-dom";
import SideBarLink from "../common/SideBarLink";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-52 h-screen border-r-2" >
        <div id="logo" className="flex text-slate-600 text-2xl m-3 items-center border-b w-48">
            <img src="/traderLogo.svg" alt="logo" className="h-14 w-12" />
            <p>Trader Log</p>
        </div>
        <div className="flex flex-col mt-28 m h-72 justify-between items-center">
            <SideBarLink text="Home" link="/home" src="/home.svg"/>
            <SideBarLink text="Reports" link="/reports" src="/reports.svg"/>
            <SideBarLink text="Calendar" link="/calendar" src="/calendar.svg"/>
            <SideBarLink text="Journal" link="/journal" src="/journal.svg"/>
            <SideBarLink text="Import" link="/import" src="/import-right.svg"/>
        </div>
    </div>
  )
}
export default Sidebar;
