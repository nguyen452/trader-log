import React, { useState } from "react";
import YearlyCalender from "../components/YearlyCalender";
import clsx from "clsx";
import MainCalendar from "../components/MainCalendar";

const CalendarPage = () => {
    // data to test the page
    console.log();
    const [month, setMonth] = useState(new Date().getMonth());
    const [selectYear, setSelectYear] = useState(new Date().getFullYear());
    const years = [2021, 2022, 2023, 2024];
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
                                    "text-slate-800": year !== selectYear,
                                    // selected
                                    "text-blue-500 font-semibold border-b-4 border-blue-500": year === selectYear,
                                })}
                                onClick={() => {
                                    setSelectYear(year);
                                }}
                            >
                                {year}
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section className=" w-3/4 mx-auto">
                <MainCalendar month={month} year={selectYear} />
            </section>
            <section className=" lg:container lg:mx-auto">
                <YearlyCalender year={selectYear} displayProfitableDays={true} />
            </section>
        </main>
    );
};
export default CalendarPage;
