import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import DateRangeIcon from "@mui/icons-material/DateRange";
import Calendar from "./Calendar";

const JournalDatePicker = ({ setDate }) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);
    const [pickedDate, setPickedDate] = useState("");
    const dispatch = useDispatch();

    //close the calendar when user clicks outside of the calendar
    useEffect(() => {
        const handler = (e) => {
            if (
                calendarRef.current &&
                !calendarRef.current.contains(e.target)
            ) {
                setShowCalendar(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });
    return (
        <div className="relative">
            <DateRangeIcon
                fontSize="small"
                className="text-gray-500 text-lg mx-3 absolute top-1.5 left-"
            />
            <input
                type="text"
                placeholder="Select date"
                className="focus:outline-blue-500 h-8 px-10 w-56 text-slate-700 rounded-lg"
                onClick={() =>
                    setShowCalendar((prevState) => !prevState)
                }
                value={pickedDate}
            />
             {showCalendar && (
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
                                setPickedDate(`${month}-${day}-${year}`);
                                // write dispatch action here to update the state of
                                dispatch(setDate(`${month}-${day}-${year}`));
                                setShowCalendar(false);
                            }}
                        />
                    </div>
                )}
        </div>
    );
}

export default JournalDatePicker;
