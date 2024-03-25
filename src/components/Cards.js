import React from "react";




const Cards = ({title, content, chart, textBoxWidth, chartWidth }) => {
    if (textBoxWidth === undefined) {
        textBoxWidth = "w-1/4";
    }

    if (chartWidth === undefined) {
        chartWidth = "w-3/4";
    }
    return (
        <div className="flex border rounded-3xl shadow-md p-4 gap-2 bg-white items-center justify-between w-80 h-36">
            <div className={`flex flex-col justify-start ${textBoxWidth} h-full space-y-8`}>
                <h2 className="text-slate-600 font-light">{title}</h2>
                <p className="text-2xl font-medium text-slate-800">{content}</p>
            </div>
            <div className={`${chartWidth}`}>
                {chart}
            </div>


       </div>
    )
}

export default Cards;
