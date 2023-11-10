import React from "react";

const TopTradeCard = ({ trade }) => {
    return (
        <div id='trade card' className="flex w-72 h-40 bg-white rounded-xl text-slate-400 text-sm font-light">
            <div id='trade-award-wrapper' className="m-6 flex">
                <div id="top trade info" className="flex flex-col gap-1">
                    <p>{trade.tickerName}</p>
                    <p className="text-slate-800 font-bold text-2xl">{trade.profitMade}</p>
                    <p>{trade.dateOfSetup}</p>
                    <p>{trade.setupName}</p>
                </div>
                <div id="top trade chart">
                    <p>chart</p>
                </div>
            </div>
        </div>
    )
};

export default TopTradeCard;
