import React from "react";



const Cards = ({title, content, chart}) => {
    return (
        <div className="flex border rounded-3xl shadow-md p-4 gap-2 bg-white items-center justify-between h-full">
            <div className="flex flex-col justify-start h-full space-y-8">
                <h2 className="text-slate-600 font-light">{title}</h2>
                <p className="text-2xl font-bold text-slate-800">{content}</p>
            </div>
            <div>
                {chart}
            </div>


       </div>
    )
}

export default Cards;
