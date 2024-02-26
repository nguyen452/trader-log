import React, { useState } from "react";
import ArrowOverCircle from "./common/ArrowOverCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import ProfitMiniAreaChart from "./ProfitsMiniAreaChart";
import JournalCardStatBox from "./JournalCardStatBox";
import Table from "./Table";
import clsx from "clsx";
const intraDayProfitCurve = [
    {time: '0930', 'Accumulated Profits': 1000},
    {time: '1100', 'Accumulated Profits': 2000},
    {time: '1300', 'Accumulated Profits': 3000},
    {time: '1400', 'Accumulated Profits': 2500},
    {time: '1600', 'Accumulated Profits': 3500},
    // add more data as needed
];


const tradeData = [
    {trade_Id: '1', time: '0930', symbol: 'AAPL', duration: '1h', entry_price: '150', exit_price: '155', 'P&L': '500'},
    {trade_Id: '2', time: '1100', symbol: 'MSFT', duration: '2h', entry_price: '200', exit_price: '210', 'P&L': '1000'},
    {trade_Id: '3', time: '1300', symbol: 'GOOG', duration: '1.5h', entry_price: '2500', exit_price: '2600', 'P&L': '1000'},
    {trade_Id: '4', time: '1400', symbol: 'AMZN', duration: '2h', entry_price: '3300', exit_price: '3400', 'P&L': '1000'},
    {trade_Id: '5', time: '1600', symbol: 'TSLA', duration: '3h', entry_price: '700', exit_price: '710', 'P&L': '1000'},
    // add more data as needed
];



const JournalCard = ({ date, profitLoss, totalTrades, winRate, winners, losers, volume, fees, profitFactor}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const data = [
        {name1: 'Total Trades', value1: totalTrades, name2: 'Win Rate', value2: winRate},
        {name1: 'Winners', value1: winners, name2: 'Losers', value2: losers},
        {name1: 'Profit and Loss', value1: volume, name2: 'Volume', value2: volume},
        {name1: 'Profit Factor', value1: profitFactor, name2: 'Fees', value2: fees},
    ]
    return (
        <section className="bg-white m-4 rounded-3xl">
            <div className="flex items-center justify-between px-4" >

                <div className="flex items-center gap-4">
                    <div className="py-4" onClick = {() => setIsExpanded(prev => !prev)}>
                        <ArrowOverCircle expanded={isExpanded} />
                    </div>
                    <div className="font-medium text-2xl">{date}</div>
                    <div className="bg-slate-200 h-3 w-3 rounded-full"></div>
                    <div className={clsx("font-medium text-2xl", {
                        "text-green-500": profitLoss > 0,
                        "text-red-500": profitLoss < 0,
                    })}x>P&L {profitLoss}</div>
                </div>
                <button className="bg-traderBlue text-white flex items-center justify-center gap-1 h-10 w-40 rounded-xl px-4">
                    <EditNoteIcon />
                    <p>View Note</p>
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex">
                    <div className="w-1/3 h-32">
                        <ProfitMiniAreaChart data={intraDayProfitCurve} yAxis={true} />
                    </div>
                    <div className="flex justify-between px-4">
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
                        <Table data={tradeData}  />
                    </div>
                }
            </div>
        </section>
    );
};

export default JournalCard;
