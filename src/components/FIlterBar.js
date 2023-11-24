import React from "react";
import SearchBar from "../components/common/SearchBar";
import DateRangePicker from "./DateRangePIcker";


const FilterBar = () => {
    return (
        <div className=" flex w-full justify-between">
            <div className=" w-48">
                <SearchBar pages="trades" />
            </div>
            <div className="flex">
                <DateRangePicker />
            </div>

            {/* date range picker */}
        </div>
    )
}

export default FilterBar
