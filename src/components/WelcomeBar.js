import React, { useState } from "react";
import ButtonWithDropDownMenu from "./common/ButtonWithDropDownMenu";
import { useSelector } from "react-redux";
import { selectSelectedPeriod, changePeriod } from "../slice/dashboardSlice";
import { selectFirstName, selectLastName } from "../slice/authSlice";

const WelcomeBar = () => {
    const selectedPeriod = useSelector(selectSelectedPeriod);

    const getPeriodText = () => {
        switch(selectedPeriod){
            case 'All time': return 'all time';
            case 'Year to date': return 'the year to date';
            case 'Last 30 days': return 'the last 30 days';
            case 'Last 7 days': return 'the last 7 days';
            default: return ''; // Default case if needed
        }
    }

    return (
        <div className="flex h-24 items-center container mx-auto p-4 text-3xl font-semibold text-slate-900 justify-between mt-8">
            <div className="flex flex-col space-y-4">
                <h1>{`Welcome, ${useSelector(selectFirstName)} ${useSelector(selectLastName)} !`}</h1>
                <h2 className="text-base text-slate-600">{`Here are your trading metrics for ${
                    getPeriodText()
                    }`}</h2>
            </div>
            <div>
                <ButtonWithDropDownMenu
                    name={selectedPeriod}
                    list={[
                        "All time",
                        "Year to date",
                        "Last 30 days",
                        "Last 7 days",
                    ]}
                    action={changePeriod}
                />
            </div>
        </div>
    );
};
export default WelcomeBar;
