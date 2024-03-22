import React, { useEffect } from "react";
import TradingViewCandleStickChart from "../components/common/TradingViewCandleStickChart";
import Table from "../components/Table";
import formatDate from "../utils/formatDates";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectTradeData,
    selectTradingViewData,
    selectTradeDataLoading,
    selectTradeDataError,
    fetchTradeData,
} from "../slice/tradesSlice";

const Trade = () => {
    const { tradeId } = useParams();

    const dispatch = useDispatch();
    const tradeData = useSelector(selectTradeData);
    const isLoading = useSelector(selectTradeDataLoading);
    const hasError = useSelector(selectTradeDataError);
    const tradingViewData = useSelector(selectTradingViewData);

    useEffect(() => {
        console.log('useEffect')
        const fetchData = async () => {
            await dispatch(fetchTradeData(tradeId));
        };
        fetchData();
    },[dispatch, tradeId]);


    if (isLoading || !tradeData || tradingViewData.length === 0) {
        return <div>Loading...</div>;
    } else if (hasError) {
        return <div>Something went wrong...</div>;
    } else {
        const date = tradeData.trade.date_close;
        const symbol = tradeData.trade.symbol;
        const profitLoss = tradeData.trade.profit;
        const sharesTraded = tradeData.totalSharesTraded;
        console.log(tradingViewData)

        return (
            <main className="container mx-auto w-full">
                <div className="flex flex-col gap-4 p-4">
                    <section className="flex justify-between items-center">
                        <div className="text-xl font-semibold flex gap-8 ">
                            <h1>{symbol}</h1>
                            <h2 className="font-medium">
                                {formatDate(date)}
                            </h2>
                        </div>
                        <div className="flex gap-8 items-center text-xl">
                            <h3>P&L {profitLoss}</h3>
                            <h3>Shares Traded: {sharesTraded}</h3>
                        </div>
                    </section>
                    <section className="grow bg-white p-4 rounded-xl shadow-md">
                        <h2 className="font-medium text-xl mb-4 ">
                            Executions
                        </h2>
                        <Table data={tradeData.tradeExecutions} />
                    </section>
                    <div className="w-full h-96 p-4 rounded-xl shadow-md bg-white">
                        <TradingViewCandleStickChart data={tradingViewData} />
                    </div>
                </div>
            </main>
        );
    }
};
export default Trade;
