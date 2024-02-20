import React from "react";

const JournalCard = ({ date, profitLoss, intraDayProfitCurve, totalTrades, winRate, winners, losers, volume, fees, profitFactor}) => {
    return (
        <>
            <div>
                <div>{/* icon */}</div>
                <div>{/* date */}</div>
                <div>{/* p & l */}</div>
                <div>{/* view Note  */}</div>
            </div>
            <div>
                <div>{/* daily pnl curve */}</div>
                <div id="box of 4 stats">
                    <div>
                        <div>
                            <h6>Total Trades</h6>
                            <p>2</p>
                        </div>
                        <div>
                            <h6>Win Rate</h6>
                            <p>100 %</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h6>Total Trades</h6>
                            <p>2</p>
                        </div>
                        <div>
                            <h6>Win Rate</h6>
                            <p>100 %</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h6>Total Trades</h6>
                            <p>2</p>
                        </div>
                        <div>
                            <h6>Win Rate</h6>
                            <p>100 %</p>
                        </div>
                    </div>
                    <div>
                        <div>
                            <h6>Total Trades</h6>
                            <p>2</p>
                        </div>
                        <div>
                            <h6>Win Rate</h6>
                            <p>100 %</p>
                        </div>
                    </div>
                </div>
                <div>
                    {/* chart of all trades for the data if expanded else it will be hidden */}
                </div>
            </div>
        </>
    );
};
