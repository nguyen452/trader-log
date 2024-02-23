import React from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import clsx from "clsx";

const ArrowOverCircle = ({ expanded }) => {
    return (
        <div className={clsx(["bg-slate-100 rounded-full h-12 w-12 flex justify-center items-center hover",
        // hover state
        "hover:bg-slate-200 hover:cursor-pointer",
        // expanded state
        {
            "rotate-90 duration-200": expanded,
            "rotate-0 duration-200": !expanded

        }])}>
            <div className="">
                <ChevronRightIcon />
            </div>
        </div>
    )
}

export default ArrowOverCircle;
