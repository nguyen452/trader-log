import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradingViewCandleStickChart = () => {
    const chartContainerRef = useRef();

    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
        const candlestickSeries = chart.addCandlestickSeries();
        const data = [
            { open: 10, high: 10.63, low: 9.49, close: 9.55, time: 1642427876 },
            {
                open: 9.55,
                high: 10.3,
                low: 9.42,
                close: 9.94,
                time: 1642514276,
            },
            {
                open: 9.94,
                high: 10.17,
                low: 9.92,
                close: 9.78,
                time: 1642600676,
            },
            {
                open: 9.78,
                high: 10.59,
                low: 9.18,
                close: 9.51,
                time: 1642687076,
            },
            {
                open: 9.51,
                high: 10.46,
                low: 9.1,
                close: 10.17,
                time: 1642773476,
            },
            {
                open: 10.17,
                high: 10.96,
                low: 10.16,
                close: 10.47,
                time: 1642859876,
            },
            {
                open: 10.47,
                high: 11.39,
                low: 10.4,
                close: 10.81,
                time: 1642946276,
            },
            {
                open: 10.81,
                high: 11.6,
                low: 10.3,
                close: 10.75,
                time: 1643032676,
            },
            {
                open: 10.75,
                high: 11.6,
                low: 10.49,
                close: 10.93,
                time: 1643119076,
            },
            {
                open: 10.93,
                high: 11.53,
                low: 10.76,
                close: 10.96,
                time: 1643205476,
            },
        ];
        const data1 = [
            { value: 10000, time: 1642425322 },
            { value: 80, time: 1642511722 },
            { value: 10, time: 1642598122 },
            { value: 20, time: 1642684522 },
            { value: 3, time: 1642770922, color: "red" },
            { value: 43, time: 1642857322 },
            { value: 41, time: 1642943722, color: "red" },
            { value: 43, time: 1643030122 },
            { value: 56, time: 1643116522 },
            { value: 46, time: 1643202922, color: "red" },
        ];
        const chartOptions1 = {
            layout: {
                textColor: "black",
                background: { type: "solid", color: "white" },
            },
        };

        const volumeSeries = chart.addHistogramSeries({
            color: "#26a69a",
            lineWidth: 2,
            priceFormat: {
                type: "volume",
            },
            priceScaleId: '',

        });
        volumeSeries.priceScale().applyOptions({scaleMargins:{top: 0.8, bottom: 0}});
        candlestickSeries.priceScale().applyOptions({top: 0.1, bottom: 0.4})
        volumeSeries.setData(data1);
        candlestickSeries.setData(data);
        chart.timeScale().fitContent();
        return () => {
            chart.remove();
        };
    }, []); // Add closing parenthesis and closing curly brace here
    return <div ref={chartContainerRef} className="h-full w-full"></div>;
};
export default TradingViewCandleStickChart;
