import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedDate, setSelectedDate } from "../slice/calendarSlice";
import {
    filteredBySelectedDate,
    selectDashboardData,
} from "../slice/dashboardSlice";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import clsx from "clsx";

function Calendar({ displayProfitableDays, action, switchMonthButton }) {
    // current date the calendar is on (default is today)
    const [currentDate, setCurrentDate] = useState(new Date());
    const data = useSelector(selectDashboardData);

    const dispatch = useDispatch();
    const selectedDate = new Date(useSelector(selectSelectedDate));

    //helper function to switch the month
    const switchMonth = (increment) => {
        if (increment) {
            setCurrentDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
            );
        } else {
            setCurrentDate(
                (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
            );
        }
    };
    //helper function to get the days to fully populate the calendar
    const getDaystoPopulateCalendar = (year, month) => {
        const dayOfWeekOfTheFirst = new Date(year, month, 1).getDay(); // return a value of 0-6 representing the day of the week of the first day of the month
        let startDayCount = new Date(
            year,
            month,
            1 - dayOfWeekOfTheFirst
        ).getDate(); // get the date of the first day of the calendar
        if (dayOfWeekOfTheFirst !== 0) {
            month--;
        }

        let arrayofDays = [];
        for (let i = 0; i < 35; i++) {
            arrayofDays.push({
                day: new Date(year, month, startDayCount).getDate(),
                month: new Date(year, month, startDayCount).getMonth(),
                year: new Date(year, month, startDayCount).getFullYear(),
            });
            startDayCount++;
        }
        return arrayofDays;
    };

    //helper function to determine if the day is profitable
    const isDayProfitable = (day) => {
        if (!data || !displayProfitableDays) {
            return "no data";
        }
        // take day and parse it using isoString and to get the date only
        const dayToCheck = new Date(day).toISOString().slice(0, 10);
        //write condition to check if the day is profitable
        if (!(dayToCheck in data.profitsPerDay)) {
            return "no data";
        } else if (data.profitsPerDay[dayToCheck] > 0) {
            return "profitable";
        } else if (data.profitsPerDay[dayToCheck] < 0) {
            return "not profitable";
        } else {
            return "no data";
        }
    };

    return (
        <div className="bg-white rounded aspect-square container p-4 max-w-md">
            <div className="flex justify-between items-center">
                {/* Calendar Header */}
                <h1 className="text-md font-semibold">
                    {currentDate.toLocaleString("default", { month: "long" })}{" "}
                    {currentDate.getFullYear()}
                </h1>
                {/* Switch Month Buttons */}
                {switchMonthButton && (
                    <div>
                        <button
                            className="mx-3 text-xl text-slate-500 hover:bg-slate-100"
                            onClick={() => switchMonth(false)}
                        >
                            <ChevronLeftIcon />
                        </button>
                        <button
                            className="mx-3 text-xl text-slate-500 hover:bg-slate-100"
                            onClick={() => switchMonth(true)}
                        >
                            <ChevronRightIcon />
                        </button>
                    </div>
                )}
            </div>

            {/* Days of the Week */}
            <div className="grid grid-cols-7 row-gap-4 py-4">
                {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
                    <div className="text-center font-medium">{day}</div>
                ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 border border-slate-100 rounded-xl font-light p-0.5">
                {/* get days to to fully populate the calendar */}

                {getDaystoPopulateCalendar(
                    currentDate.getFullYear(),
                    currentDate.getMonth()
                ).map((date, index) => {
                    const todaysDate = {
                        year: new Date().getFullYear(),
                        month: new Date().getMonth(),
                        day: new Date().getDate(),
                    };
                    return (
                        <div
                            className={clsx(
                                "flex items-center justify-center hover:cursor-pointer aspect-square m-0.5 rounded-md",
                                // background green if day is profitable
                                {
                                    "bg-green-100 hover:bg-green-200":
                                        isDayProfitable(
                                            new Date(
                                                date.year,
                                                date.month,
                                                date.day
                                            )
                                        ) === "profitable",
                                },
                                // background red if day is not profitable
                                {
                                    "bg-red-100 hover:bg-red-200":
                                        isDayProfitable(
                                            new Date(
                                                date.year,
                                                date.month,
                                                date.day
                                            )
                                        ) === "not profitable",
                                },
                                // background white if there is no data
                                {
                                    "bg-white hover:bg-slate-50":
                                        isDayProfitable(
                                            new Date(
                                                date.year,
                                                date.month,
                                                date.day
                                            )
                                        ) === "no data",
                                },
                                {}
                            )}
                            key={index}
                            onClick={() => {
                                action(
                                    new Date(date.year, date.month, date.day)
                                );
                            }}
                        >
                            <p
                                className={clsx({
                                    "p-2 aspect-square flex items-center justify-center w-3/4": true,
                                    // text will be blue if it is today
                                    "text-blue-500 font-semibold":
                                        date.year === todaysDate.year &&
                                        date.month === todaysDate.month &&
                                        date.day === todaysDate.day,
                                    //  text will be gray if it is not the current month
                                    "text-gray-300":
                                        date.month !== currentDate.getMonth(),
                                    // selected date will have white text and blue background when selected
                                    "text-white bg-blue-500 rounded-full":
                                        date.year ===
                                            selectedDate.getFullYear() &&
                                        date.month ===
                                            selectedDate.getMonth() &&
                                        date.day === selectedDate.getDate(),
                                })}
                            >
                                {date.day}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Calendar;
