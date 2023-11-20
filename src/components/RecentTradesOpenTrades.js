import React, { useState } from "react";
import Table from "../components/Table";
import ButtonWithDropDownMenu from "./common/ButtonWithDropDownMenu";
import { useSelector, useDispatch } from "react-redux";
import {
    changeRecentTradesPeriod,
    selectRecentTradesPeriod,
} from "../slice/dashboardSlice";
import clsx from "clsx";
import filterLastTrades from "../utils/filterLastTrades";

const RecentTradesOpenTrades = ({ recentTradeData, openTradeData }) => {
    const [recentTrades, setRecentTrades] = useState(true);
    const recentTradesPeriod = useSelector(selectRecentTradesPeriod);
    recentTradeData = filterLastTrades(recentTradeData, recentTradesPeriod);

    return (
        <div className=" w-full flex flex-col bg-white rounded-3xl shadow-md overflow-x-auto font-medium text-slate-800 p-8">
            <div className=" flex justify-between items-center">
                <div className="flex gap-4 p-4">
                    <h2
                        className={clsx(
                            //active
                            "p-4 hover:cursor-pointer hover:bg-slate-50 rounded-xl text-xl",
                            // inactive
                            {
                                "text-slate-300 text-xl font-light hover:text-slate-400":
                                    !recentTrades,
                            }
                        )}
                        onClick={() => {
                            setRecentTrades((prevState) => !prevState);
                        }}
                    >
                        Recent Trades
                    </h2>
                    <div className="border-l"></div>
                    <h2
                        className={clsx(
                            //active
                            "p-4 hover:cursor-pointer hover:bg-slate-50 rounded-xl text-xl",
                            // inactive
                            {
                                "text-slate-300 text-xl font-light hover:text-slate-400":
                                    recentTrades,
                            }
                        )}
                        onClick={() => {
                            setRecentTrades((prevState) => !prevState);
                        }}
                    >
                        Open Trades
                    </h2>
                </div>
                <div className="p-4">
                    <ButtonWithDropDownMenu
                        name={recentTradesPeriod}
                        list={[
                            "Last 10 trades",
                            "Last 20 trades",
                            "Last 30 trades",
                        ]}
                        action={changeRecentTradesPeriod}
                    />
                </div>
            </div>

            {/* make the data that goes in data table conditional */}
            {recentTrades ? (
                <Table data={recentTradeData} />
            ) : (
                <Table data={openTradeData} />
            )}

            {/* <div className="text-right p-4 ">
                <button className="bg-zinc-100 p-2 rounded-xl">View All</button>
            </div> */}
        </div>
    );
};

export default RecentTradesOpenTrades;
