import React from "react";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Calendar from "./Calendar";

const DateRangePicker = () => {

    return (
        <form className="flex space-x-4">
            <div className="relative">
                <DateRangeIcon fontSize="small" className="text-gray-500 text-lg mx-3 absolute top-1.5 left-" />
                <input type="text" placeholder="Select date start" className="focus:outline-blue-500 h-8 px-10 w-56" />
                {/* <Calendar /> */}
            </div>
            <p className="text-lg font-light text-slate-700">to</p>
            <div className="relative">
                <DateRangeIcon fontSize="small" className="text-gray-500 text-lg mx-3 absolute top-1.5 left-" />
                <input type="text" placeholder="Select date end" className="focus:outline-blue-500 h-8 px-10  w-56" />
            </div>
        </form>
    );
};

export default DateRangePicker;

//
