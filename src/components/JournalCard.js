import React, { useState } from "react";
import ArrowOverCircle from "./common/ArrowOverCircle";
import EditNoteIcon from '@mui/icons-material/EditNote';

const JournalCard = ({ date, profitLoss, intraDayProfitCurve, totalTrades, winRate, winners, losers, volume, fees, profitFactor}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    return (
        <section className="bg-white m-4 rounded-3xl">
            <div className="flex items-center justify-between px-4" >

                <div className="flex items-center gap-4">
                    <div className="py-4" onClick = {() => setIsExpanded(prev => !prev)}>
                        <ArrowOverCircle expanded={isExpanded} />
                    </div>
                    <div className="font-medium text-2xl">{date}</div>
                    <div className="bg-slate-200 h-3 w-3 rounded-full"></div>
                    <div className="font-medium text-2xl">P&L {profitLoss}</div>
                </div>
                <button className="bg-traderBlue text-white flex items-center justify-center gap-1 h-10 w-40 rounded-xl px-4">
                    <EditNoteIcon />
                    <p>View Note</p>
                </button>
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
        </section>
    );
};

export default JournalCard;
