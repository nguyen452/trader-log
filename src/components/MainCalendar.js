import React from "react";
import monthName from "../utils/convertMonthName";
import { useSelector, useDispatch } from "react-redux";
import { selectDashboardData } from "../slice/dashboardSlice";
import clsx from "clsx";
const MainCalendar = ({ year, month, displayProfitableDays }) => {
    const data = useSelector(selectDashboardData);
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
    //helper function to get the days to fully populate the calendar
    const getDaystoPopulateCalendar = (year, month) => {
        console.log(year, month);
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
    return (
        <div className="bg-white rounded-md aspect-square container p-4 w-full h-full">
            <div className="flex justify-between items-center py-2">
                {/* Calendar Header */}
                <h1 className="text-xl font-semibold">
                    {monthName(month)} {year}
                </h1>

                <div className="flex gap-4">
                    <h2>Monthly P&L</h2>
                    <p>$ {"monthly profits goes here"}</p>
                </div>
            </div>

            {/* Days of the Week */}
            <div className="grid grid-cols-7 row-gap-4 py-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sun"].map(
                    (day) => (
                        <div className="text-center font-medium">{day}</div>
                    )
                )}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 border border-slate-100 font-light p-0.5">
                {/* get days to to fully populate the calendar */}
                {console.log(getDaystoPopulateCalendar(year, month))}
                {getDaystoPopulateCalendar(year, month).map((date, index) => {
                    // const todaysDate = {
                    //     year: new Date().getFullYear(),
                    //     month: new Date().getMonth(),
                    //     day: new Date().getDate(),
                    // };
                    return (
                        <div
                            className={clsx(
                                "flex flex-col justify-center hover:cursor-pointer m-0.5 rounded-md aspect-square p-2  ",
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
                            // onClick={() => {
                            //     action(
                            //         new Date(
                            //             date.year,
                            //             date.month,
                            //             date.day
                            //         )
                            //     );
                            // }}
                        >
                            <p
                                className={clsx({
                                    "": true,
                                    // text will be blue if it is today
                                    // "text-blue-500 font-semibold":
                                    //     date.year ===
                                    //         todaysDate.year &&
                                    //     date.month ===
                                    //         todaysDate.month &&
                                    //     date.day === todaysDate.day,
                                    //  text will be gray if it is not the current month
                                    "text-gray-300": date.month !== month,
                                    // selected date will have white text and blue background when selected
                                    // "text-white bg-blue-500 rounded-full":
                                    //     date.year ===
                                    //         selectedDate.getFullYear() &&
                                    //     date.month ===
                                    //         selectedDate.getMonth() &&
                                    //     date.day ===
                                    //         selectedDate.getDate(),
                                })}
                            >
                                {date.day}
                            </p>
                            <p>{`$ `}</p>
                            <p>{`${"test"} trades`}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MainCalendar;
