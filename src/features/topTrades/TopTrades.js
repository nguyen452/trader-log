import React from "react";
import TopTradeCard from "./TopTradeCard";
import data from "../../devData.json";

const TopTrades = () => {
    return (
        <div id='top trade cards container' className="flex justify-between items-center ">
            {data.data.map((trade) => {
                return (
                    <TopTradeCard trade={trade} />
                )
            })}
        </div>
    )
}
export default TopTrades
