import React from "react";
import TradeCard from "./tradeCard";
import { NavLink } from "react-router-dom";


const TradesInSelectedDay = ({selectedDay, tradeData}) => {
    //trades for the selected day will be passed in as props
    return (
        <div className="flex flex-col justify-center" >
            <h2 className="text-center text-xl font-semibold my-5">Trades for {selectedDay}</h2>
            <div id="trade-card-holder" className="flex flex-col gap-4 rounded p-5">
                {tradeData.map((trade) => {
                    return (
                        <TradeCard side={trade.side} symbol={trade.symbol} volume={trade.Volume} profitAndLoss={trade['P&L']} />
                    )
               })}
            </div>

        </div>
    )
}

export default TradesInSelectedDay;
