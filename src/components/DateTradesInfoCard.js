import React from "react";
import DailyAreaCurve from "./DailyAreaCurve";
import JournalCardStatBox from "./JournalCardStatBox";
import Table from "./Table";
import clsx from "clsx";
import formatDate from "../utils/formatDates";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { closeDateModal } from "../slice/calendarModalSlice";

const DatesTradesInfoCard = ({
    date,
    profitLoss,
    totalTrades,
    winRate,
    winners,
    losers,
    biggestWin,
    biggestLoss,
    totalGrossProfit,
    totalGrossLoss,
    intraDayProfitCurve,
    dailyTradesData,
}) => {
    console.log(intraDayProfitCurve)
    const dispatch = useDispatch();
    const data = [
        {
            name1: "Total Trades",
            value1: totalTrades,
            name2: "Win Rate",
            value2: winRate,
        },
        { name1: "Winners", value1: winners, name2: "Losers", value2: losers },
        {
            name1: "Biggest Win",
            value1: `$ ${biggestWin}`,
            name2: "Biggest Loss",
            value2: biggestLoss,
        },
        {
            name1: "Gross Profit",
            value1: totalGrossProfit,
            name2: "Gross Loss",
            value2: totalGrossLoss,
        },
    ];
    const handleCloseModal = () => {
        dispatch(closeDateModal());
    };

    return (
        <section className="bg-white m-4 rounded-3xl p-4">
            <div className="flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <div className="font-medium text-xl">
                        {formatDate(date)}
                    </div>
                    <div className="bg-slate-200 h-3 w-3 rounded-full"></div>
                    <div
                        className={clsx("font-medium text-xl", {
                            "text-green-500": profitLoss > 0,
                            "text-red-500": profitLoss < 0,
                        })}
                        x
                    >
                        P&L {profitLoss}
                    </div>
                </div>
                <div className="hover:cursor-pointer hover:text-slate-600" onClick={handleCloseModal}>
                        <CloseIcon />
                    </div>
            </div>
            <div className="flex flex-col gap-4 py-4">
                <div className="flex">
                    <div className="w-1/3 h-32">
                        <DailyAreaCurve
                            data={intraDayProfitCurve}
                            yAxis={true}
                            xAxis={true}
                        />
                    </div>
                    <div className="flex items-center justify-between px-4 w-full">
                        {data.map((item, index) => {
                            const isLastItem = index === data.length - 1;
                            return (
                                <JournalCardStatBox
                                    title1={item.name1}
                                    value1={item.value1}
                                    title2={item.name2}
                                    value2={item.value2}
                                    isLastItem={isLastItem}
                                />
                            );
                        })}
                    </div>
                </div>

                <div>
                    <Table data={dailyTradesData} />
                </div>
            </div>
        </section>
    );
};

export default DatesTradesInfoCard;
