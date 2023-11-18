import React from "react";
import { NavLink } from "react-router-dom";

const SideBarLink = ({ text, link, icon }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `${isActive ? 'text-traderBlue' : 'text-slate-500'} flex items-center w-40 h-12  text-md rounded-md p-3 hover:bg-slate-100 hover:shadow-lg`
      }
    >
      {icon}
      <p>{text}</p>
    </NavLink>
  );
};

export default SideBarLink;
