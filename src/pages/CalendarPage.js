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
    fetchCalendarYearTradeData,
} from "../slice/calendarSlice";
import Modal from "../components/common/Modal";
import {
    selectDateSelected,
    selectIsOpen,
    selectMonth,
    selectTradeDataByDate,
    selectIsDateModalOpen,
} from "../slice/calendarModalSlice";

import {
    selectIsModalOpen as selectIsJournalModalOpen,
    closeModal as closeJournalModal,
} from "../slice/journalModalSlice";
import calculateIntraDayProfitCurveData from "../utils/calculateIntraDayProfitCurveData";
import DatesTradesInfoCard from "../components/DateTradesInfoCard";
const CalendarPage = () => {
    const isModalOpen = useSelector(selectIsOpen);
    const isJournalModalOpen = useSelector(selectIsJournalModalOpen);
    const selectedMonth = useSelector(selectMonth);
    const selectedYear = useSelector(selectSelectedYear);
    const years = useSelector(selectYears);
    const date = useSelector(selectDateSelected);
    const isLoading = useSelector(selectIsLoading);
    const hasError = useSelector(selectHasError);
    const dispatch = useDispatch();
    const tradeDataByDate = useSelector(selectTradeDataByDate);
    const isDateModalOpen = useSelector(selectIsDateModalOpen);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchCalendarYear());
        };
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                fetchCalendarYearTradeData({ year: selectedYear, month: null })
            );
        };
        fetchData();
    }, [dispatch, selectedYear]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (hasError) {
        return <div>Unable to fetch data</div>;
    } else if (years.length === 0) {
        return <div>No data available</div>;
    } else {
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
                                        dispatch(setSelectedYear(year));
                                    }}
                                >
                                    {year}
                                </li>
                            );
                        })}
                    </ul>
                </section>
                <Modal open={isModalOpen}>
                    <MainCalendar
                        month={selectedMonth}
                        year={selectedYear}
                        displayProfitableDays={true}
                    />
                </Modal>
                <Modal open={isDateModalOpen}>
                    <DatesTradesInfoCard
                        key={date}
                        date={date}
                        totalTrades={tradeDataByDate.totalTrades}
                        winRate={tradeDataByDate.winRate}
                        winners={tradeDataByDate.totalWinningTrades}
                        losers={tradeDataByDate.totalLosingTrades}
                        biggestWin={tradeDataByDate.largestWin}
                        biggestLoss={tradeDataByDate.largestLoss}
                        totalGrossProfit={tradeDataByDate.totalGrossProfit}
                        totalGrossLoss={tradeDataByDate.totalGrossLoss}
                        profitLoss={tradeDataByDate.totalProfit}
                        intraDayProfitCurve={
                            calculateIntraDayProfitCurveData(tradeDataByDate.completeTradesInfo)
                        }
                        dailyTradesData={tradeDataByDate.completeTradesInfo}
                    />
                </Modal>
                <section className=" lg:container lg:mx-auto">
                    <YearlyCalender
                        year={selectedYear}
                        displayProfitableDays={true}
                    />
                </section>
            </main>
        );
    }
};
export default CalendarPage;
