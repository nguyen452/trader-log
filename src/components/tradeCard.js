import React from "react";
import TradeSideIndicator from "./common/TradeSIdeIndicator";

const TradeCard = ({ side, symbol, volume, profitAndLoss }) => {
    return (
      <div className='w-96 h-10 flex items-center justify-center rounded-md  space-x-3 shadow-md '>
        <TradeSideIndicator side={side} />
        <p>{symbol}</p>
        <p>Volume: {volume}</p>
        {profitAndLoss > 0 ? (
          <p className='text-softGreen'>P&L: +{profitAndLoss}</p>
        ) : (
          <p className='text-rose-500'>P&L: -{profitAndLoss}</p>
        )}
      </div>
    );
  };

export default TradeCard;
