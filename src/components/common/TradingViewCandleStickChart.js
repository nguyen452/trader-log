import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradingViewCandleStickChart = ({data}) => {
    const chartContainerRef = useRef();
    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
        const candlestickSeries = chart.addCandlestickSeries();

        const volume = data.map(item => {return {time: item.time, value: item.volume}});

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
        volumeSeries.setData(volume);
        candlestickSeries.setData(data);
        chart.timeScale().fitContent();
        return () => {
            chart.remove();
        };
    }, []); // Add closing parenthesis and closing curly brace here
    if (!data) {
        return <div>Loading...</div>;
    } else if (data.length === 0) {
        return <div>No data available</div>;
    }



    return <div ref={chartContainerRef} className="h-full w-full"></div>;
};
export default TradingViewCandleStickChart;
