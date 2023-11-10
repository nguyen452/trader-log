import React from "react";
import clsx from "clsx";
import Profile from "./Profile"

const SignedInNavBar = () => {
    return (
        <nav className="flex h-14 w-full justify-end ">
            <Profile/>
        </nav>
    )
}
export default SignedInNavBar;
