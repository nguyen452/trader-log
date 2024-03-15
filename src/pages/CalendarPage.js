import React, { useState, useEffect } from "react";
import YearlyCalender from "../components/YearlyCalender";
import clsx from "clsx";
import MainCalendar from "../components/MainCalendar";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCalendarYear,
    selectYears,
    setSelectedMonth,
    setSelectedYear,
    selectSelectedMonth,
    selectSelectedYear,
    selectIsLoading,
    selectHasError,
} from "../slice/calendarSlice";
import Modal from "../components/common/Modal";
import { selectIsOpen, selectMonth, selectYear } from "../slice/calendarModalSlice";




const CalendarPage = () => {
    const isModalOpen = useSelector(selectIsOpen);
    const selectedMonth = useSelector(selectMonth);
    const selectedYear = useSelector(selectSelectedYear);
    const years = useSelector(selectYears);

    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCalendarYear());
        };
        fetchData();
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (hasError) {
        return <div>Unable to fetch data</div>;
    }

    if (years.length === 0) {
        return <div>No data available</div>;
    }
    if (years.length > 0) {
        dispatch(setSelectedYear(years[years.length - 1]));
    }



    return (
        <main className="flex flex-col gap-4 p-4">
            <section className="flex gap-6 justify-center items-center ">
                <h2 className="font-medium">Year</h2>
                <ul className="flex gap-4">
                    {years.map((year) => {
                        return (
                            <li
                                key={year}
                                className={clsx({
                                    "hover:cursor-pointer": true,
                                    // not selected
                                    "text-slate-800": year !== selectedYear,
                                    // selected
                                    "text-blue-500 font-semibold border-b-4 border-blue-500":
                                        year === selectedYear,
                                })}
                                onClick={() => {
                                    setSelectedYear(year);
                                }}
                            >
                                {year}
                            </li>
                        );
                    })}
                </ul>
            </section>
            <Modal
                open={isModalOpen}
            >
                  <MainCalendar month={selectedMonth} year={selectedYear} displayProfitableDays={true} />
            </Modal>
            <section className=" lg:container lg:mx-auto">
                <YearlyCalender
                    year={selectedYear}
                    displayProfitableDays={true}
                />
            </section>
        </main>
    );
};
export default CalendarPage;
