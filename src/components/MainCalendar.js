import React, { useEffect } from "react";
import monthName from "../utils/convertMonthName";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import {
    closeModal,
    getCalendarModalData,
    selectTradeData,
    selectIsLoading,
    selectHasError,
    selectMonthProfit,
    setDate as setCalendarSelectedDate,
    getTradeDataByDate,
    openDateModal
} from "../slice/calendarModalSlice";
import isDayProfitable from "../utils/isDayProfitable";
import clsx from "clsx";
import getProfitForDay from "../utils/getProfitForDay";
import getNumberOfTradesPerDay from "../utils/getNumberTradePerDay";


const MainCalendar = ({ year, month, displayProfitableDays }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const monthProfit = useSelector(selectMonthProfit);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getCalendarModalData({ year, month }));
        };
        fetchData();
    }, [dispatch, month, year]);

    const data = useSelector(selectTradeData);

    const handleCloseModal = () => {
        dispatch(closeModal());
    };

    const handleOpenDateModal = async (date) => {
        //convert date to iso string
        date = new Date(date).toISOString().slice(0, 10)

        dispatch(setCalendarSelectedDate(date));
        await dispatch(getTradeDataByDate(date));
        dispatch(openDateModal());

    }

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

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (hasError) {
        return <div>Unable to fetch data</div>;
    } else {
        return (
            <div className="bg-white rounded-xl container p-8 flex flex-col justify-center">
                <div className="flex justify-between items-center py-2">
                    {/* Calendar Header */}
                    <h1 className="text-xl font-semibold">
                        {monthName(month)} {year}
                    </h1>

                    <div className="flex gap-8">
                        <div className="flex gap-4 font-semibold">
                            <h2>Monthly P&L</h2>
                            <p className={clsx({
                                "text-green-500": monthProfit > 0,
                                "text-red-500": monthProfit < 0,
                                "text-slate-600": monthProfit === 0
                            })}>$ {monthProfit}</p>
                        </div>
                        <div
                            className="hover:cursor-pointer hover:text-slate-600"
                            onClick={handleCloseModal}
                        >
                            <CloseIcon />
                        </div>
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

                    {getDaystoPopulateCalendar(year, month).map(
                        (date, index) => {
                            const currentDate = new Date(
                                date.year,
                                date.month,
                                date.day
                            );

                            return (
                                <div
                                    className={clsx(
                                        "flex flex-col hover:cursor-pointer m-0.5 rounded-md aspect-square p-2  ",
                                        // background green if day is profitable
                                        {
                                            "bg-green-100 hover:bg-green-200 text-green-500 font-medium":
                                                isDayProfitable(
                                                    currentDate,
                                                    data,
                                                    displayProfitableDays
                                                ) === "profitable",
                                        },
                                        // background red if day is not profitable
                                        {
                                            "bg-red-100 hover:bg-red-200 text-red-500 font-medium":
                                                isDayProfitable(
                                                    currentDate,
                                                    data,
                                                    displayProfitableDays
                                                ) === "not profitable",
                                        },
                                        // background white if there is no data
                                        {
                                            "bg-white hover:bg-slate-50 text-slate-800":
                                                isDayProfitable(
                                                    currentDate,
                                                    data,
                                                    displayProfitableDays
                                                ) === "no data",
                                        },
                                        {}
                                    )}
                                    key={index}
                                    onClick={() => {
                                        handleOpenDateModal(currentDate);
                                    }}
                                >
                                    <p
                                        className={clsx({
                                            "font-semibold p-4 text-slate-800 ": true,
                                            // text will be blue if it is today
                                            // "text-blue-500 font-semibold":
                                            //     date.year ===
                                            //         todaysDate.year &&
                                            //     date.month ===
                                            //         todaysDate.month &&
                                            //     date.day === todaysDate.day,
                                            //  text will be gray if it is not the current month
                                            "text-gray-300":
                                                date.month !== month,
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
                                    <div className="flex flex-col gap-4 justify-center items-center pt-4">
                                        <p>{`$ ${getProfitForDay(
                                            currentDate,
                                            data
                                        )} `}</p>
                                        <p>{`${getNumberOfTradesPerDay(
                                            currentDate,
                                            data
                                        )} trades`}</p>
                                    </div>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>
        );
    }
};

export default MainCalendar;
