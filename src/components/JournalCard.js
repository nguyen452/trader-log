import React, { useState } from "react";
import ArrowOverCircle from "./common/ArrowOverCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DailyAreaCurve from "./DailyAreaCurve";
import JournalCardStatBox from "./JournalCardStatBox";
import Table from "./Table";
import clsx from "clsx";
import formatDate from "../utils/formatDates";
import { useSelector, useDispatch } from "react-redux";
import { setDate, openModal } from "../slice/journalModalSlice";


const JournalCard = ({ date, profitLoss, totalTrades, winRate, winners, losers, biggestWin, biggestLoss, totalGrossProfit, totalGrossLoss, intraDayProfitCurve, dailyTradesData}) => {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);

    const data = [
        {name1: 'Total Trades', value1: totalTrades, name2: 'Win Rate', value2: winRate},
        {name1: 'Winners', value1: winners, name2: 'Losers', value2: losers},
        {name1: 'Biggest Win', value1: `$ ${biggestWin}`, name2: 'Biggest Loss', value2: biggestLoss},
        {name1: 'Gross Profit', value1: totalGrossProfit, name2: 'Gross Loss', value2: totalGrossLoss},
    ]
    const handleViewNote = () => {
        dispatch(setDate(date));
        dispatch(openModal());
    }

    return (
        <section className="bg-white m-4 rounded-3xl">
            <div className="flex items-center justify-between px-4" >

                <div className="flex items-center gap-4">
                    <div className="py-4" onClick = {() => setIsExpanded(prev => !prev)}>
                        <ArrowOverCircle expanded={isExpanded} />
                    </div>
                    <div className="font-medium text-xl">{formatDate(date)}</div>
                    <div className="bg-slate-200 h-3 w-3 rounded-full"></div>
                    <div className={clsx("font-medium text-xl", {
                        "text-green-500": profitLoss > 0,
                        "text-red-500": profitLoss < 0,
                    })}x>P&L {profitLoss}</div>
                </div>
                <button className="bg-traderBlue text-white flex items-center justify-center gap-1 h-10 w-40 rounded-xl px-4" onClick={handleViewNote}>
                    <EditNoteIcon />
                    <p>View Note</p>
                </button>
            </div>
            <div className="flex flex-col gap-4 py-4">
                <div className="flex">
                    <div className="w-1/3 h-32">
                        <DailyAreaCurve data={intraDayProfitCurve} yAxis={true} xAxis={true}/>
                    </div>
                    <div className="flex items-center justify-between px-4 w-full">
                        {data.map((item, index) => {
                            const isLastItem = index === data.length - 1;
                            return <JournalCardStatBox title1={item.name1} value1={item.value1} title2={item.name2} value2={item.value2} isLastItem={isLastItem} />
                        })}
                        {/* <JournalCardStatBox title1="test" value1='test' title2={'test'} value2={"test"} /> */}
                    </div>
                </div>
                {/* chart of all trades for the data if expanded else it will be hidden */}
                {isExpanded &&
                    <div>
                        <Table data={dailyTradesData}  />
                    </div>
                }
            </div>
        </section>
    );
};

export default JournalCard;
