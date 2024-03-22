import React, { useEffect, useRef } from "react";
import { createChart } from "lightweight-charts";

const TradingViewCandleStickChart = ({ data }) => {
    const chartContainerRef = useRef();
    useEffect(() => {
        const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
        });
        chart.timeScale().applyOptions({
            timeVisible: true,
            secondsVisible: false,
        });

        chart.applyOptions({
            rightPriceScale: {
                scaleMargins: {top: 0, bottom: 0.25}
            },
        })
        const candlestickSeries = chart.addCandlestickSeries();

        const volume = data.map((item) => {
            if (Number(item.open) >= Number(item.close)) {
                return { time: item.time, value: item.volume };
            } else {
                return {
                    time: item.time,
                    value: item.volume,
                    color: "rgba(239, 83, 80, 0.75)",
                };
            }
        });

        const volumeSeries = chart.addHistogramSeries({
            color: "rgba(38, 166, 154, 0.75)",
            lineWidth: 2,
            priceFormat: {
                type: "volume",
            },
            priceScaleId: "",
        });
        volumeSeries
            .priceScale()
            .applyOptions({ scaleMargins: { top: 0.8, bottom: 0 } });
        candlestickSeries.priceScale().applyOptions({ top: 0.6, bottom: 0.4 });
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
