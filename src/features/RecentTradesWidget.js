import React from "react";
import Calendar from "../components/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedDate } from "../slice/calendarSlice";
import { selectFilteredTradeByDay } from "../slice/dashboardSlice";
import { selectSelectedDate, setSelectedDate } from "../slice/calendarSlice";
import Table from "../components/Table";

const RecentTradesWidget = () => {
    const dispatch = useDispatch();
    const selectedDate = new Date(useSelector(selectSelectedDate));

    const dataBySelectedDay = useSelector(selectFilteredTradeByDay);
    // data =  getFilteredDataBySelectedDay(data, selectedDate);
    if (!dataBySelectedDay) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center bg-white w-full h-full md:gap-4 rounded-3xl shadow-md p-4">
        <Calendar displayProfitableDays={true} switchMonthButton={true}/>
            <div className="w-full h-full">
                <h2 className="font-bold text-slate-800 text-xl p-8">
                    {selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
                {dataBySelectedDay.length === 0 ? (
                    <div className="text-center text-slate-800 text-xl p-8">
                        No trades on this day
                    </div>
                ) : (
                <div>
                     <Table
                        data={dataBySelectedDay}
                        title={selectedDate.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    />
                </div>
                )}
            </div>
        </div>
    );
};

export default RecentTradesWidget;
