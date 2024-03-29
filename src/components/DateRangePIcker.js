import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Calendar from "./Calendar";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import clsx from "clsx";

const DateRangePicker = ({ startDateAction, endDateAction }) => {
    const [showStartCalendar, setShowStartCalendar] = useState(false);
    const [showEndCalendar, setShowEndCalendar] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [endDateError, setEndDateError] = useState(false);
    const calendarRef = useRef(null);
    const dispatch = useDispatch();

    //close the calendar when user clicks outside of the calendar
    if (new Date(startDate) > new Date(endDate)) {
        setEndDateError(true);
    }
    useEffect(() => {
        const handler = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target)
            ) {
                setShowStartCalendar(false);
                setShowEndCalendar(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <form className="flex space-x-4 rounded-lg">
            {endDateError && (
                <div className="flex items-center">
                    <PriorityHighIcon className="text-red-500" />
                    <p className="text-red-500 text-sm">
                        End date must be after start date
                    </p>
                </div>
            )}
            <div className="relative">
                <DateRangeIcon
                    fontSize="small"
                    className="text-gray-500 text-lg mx-3 absolute top-1.5 left-"
                />
                <input
                    type="text"
                    placeholder="Select date start"
                    className="focus:outline-blue-500 h-8 px-10 w-56 text-slate-700 rounded-lg"
                    onClick={() =>
                        setShowStartCalendar((prevState) => !prevState)
                    }
                    onChange={(e) => setStartDate(e.target.value)}
                    value={startDate}
                />
                {showStartCalendar && (
                    <div
                        className="absolute w-96 shadow-md rounded-md my-2 p-1 bg-white"
                        ref={calendarRef}
                    >
                        <Calendar
                            action={(selectedDate) => {
                                let day = selectedDate.getDate();
                                let month = selectedDate.getMonth() + 1;
                                const year = selectedDate.getFullYear();
                                // add leading zero to day and month if they are single digit
                                if (day < 10) day = `0${day}`;
                                if (month < 10) month = `0${month}`;
                                setStartDate(`${month}-${day}-${year}`);
                                dispatch(startDateAction(`${month}-${day}-${year}`));
                                setShowStartCalendar(false);
                            }}
                            switchMonthButton={true}
                        />
                    </div>
                )}
            </div>
            <p className="text-lg font-light text-slate-700">to</p>
            <div className="relative  rounded-lg ">
                <DateRangeIcon
                    fontSize="small"
                    className="text-gray-500 text-lg mx-3 absolute top-1.5 left-"
                />
                <input
                    type="text"
                    placeholder="Select date end"
                    className={clsx({
                        "focus:outline-blue-500 h-8 px-10 w-56 text-slate-700 rounded-lg": true,
                        "border-2 border-red-500": endDateError,
                    })}
                    onClick={() =>
                        setShowEndCalendar((prevState) => !prevState)
                    }
                    onChange={(e) => setEndDate(e.target.value)}
                    value={endDate}
                />

                {showEndCalendar && (
                    <div
                        className="absolute right-0 w-96 shadow-md rounded-md my-2 p-1 bg-white"
                        ref={calendarRef}
                    >
                        <Calendar
                            action={(selectedDate) => {
                                let day = selectedDate.getDate();
                                let month = selectedDate.getMonth() + 1;
                                const year = selectedDate.getFullYear();
                                // add leading zero to day and month if they are single digit
                                if (day < 10) day = `0${day}`;
                                if (month < 10) month = `0${month}`;
                                setEndDate(`${month}-${day}-${year}`);
                                if (selectedDate < new Date(startDate)) {
                                    setEndDateError(true);
                                    setShowEndCalendar(false);
                                } else {
                                    setEndDateError(false);
                                    dispatch(endDateAction(`${month}-${day}-${year}`));
                                    setShowEndCalendar(false);
                                }
                            }}
                            switchMonthButton={true}
                        />
                    </div>
                )}
            </div>
        </form>
    );
};

export default DateRangePicker;

//
