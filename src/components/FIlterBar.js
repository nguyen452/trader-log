import React from "react";
import SearchBar from "../components/common/SearchBar";
import DateRangePicker from "./DateRangePIcker";
import { setStartDate, setEndDate } from "../slice/tradeLogSlice";

const FilterBar = () => {
    return (
        <div className=" flex w-full justify-between">
            <div className=" w-48">
                <SearchBar pages="trades" />
            </div>
            <div className="flex">
                <DateRangePicker startDateAction={setStartDate} endDateAction={setEndDate} />
            </div>
        </div>
    )
}

export default FilterBar
