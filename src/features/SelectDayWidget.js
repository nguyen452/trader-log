import React from "react";
import Calendar from "../components/Calendar";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedDate, setSelectedDate } from "../slice/calendarSlice";
import { filteredBySelectedDate, selectFilteredTradeByDay } from "../slice/dashboardSlice";
import Table from "../components/Table";

const SelectDayWidget = () => {
    const selectedDate = new Date(useSelector(selectSelectedDate));
    const dispatch = useDispatch();

    const handleChangeDate = (selectedDate) => {
        dispatch(setSelectedDate(selectedDate));
        dispatch(filteredBySelectedDate(selectedDate));
    }


    const dataBySelectedDay = useSelector(selectFilteredTradeByDay);
    // data =  getFilteredDataBySelectedDay(data, selectedDate);
    if (!dataBySelectedDay) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col md:flex-row items-center bg-white w-full h-full md:gap-4 rounded-3xl shadow-md p-4">
            <Calendar className="flex" displayProfitableDays={true} action= {(selectedDate) => {
                handleChangeDate(selectedDate);
            }} />
            <div className="w-full h-full">
                <h2 className="font-normal text-slate-800 text-xl p-8">
                    {selectedDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </h2>
                {dataBySelectedDay.length === 0 ? (
                    <div className="text-center text-slate-600 text-lg p-8 font-normal">
                        No trades on this day
                    </div>
                ) : (
                <div>
                     <Table
                        data={dataBySelectedDay}
                    />
                </div>
                )}
            </div>
        </div>
    );
};

export default SelectDayWidget;
