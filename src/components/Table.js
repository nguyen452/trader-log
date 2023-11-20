import React from "react";
import clsx from "clsx";


const Table = ({ data, title }) => {
    if (!data) {
        return <div>Loading...</div>;
    } else if (data.length === 0) {
        return <div>There are no trades </div>;
    }
    // slice up the data to only show the last 10 trades, place the other trades in a separate array, on top of page have button to select to show last 30 trades, 20 trades, 10 trades.
    return (
        <table
                className={clsx(
                    "table-auto",
                    "w-full",
                    "border-collapse",
                    "border",
                    "border-zinc-100",
                    "bg-white",
                    "text-base",
                    "font-light"

                )}
            >
                <thead className="font-light">
                    <tr className="bg-blue-50 text-zinc-700 text-base">
                        {/* take the first element of data array and extract the keys as header */}
                        {Object.keys(data[0]).splice(1).map((columnName) => (
                            <th className="p-4 font-medium" key={columnName}>
                                {" "}
                                {columnName}{" "}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {/* destructure tradeId from data  */}
                    {data.map(({tradeId, ...rowItem}, index) => {
                        return (
                            <tr className={clsx({
                                "hover:bg-slate-100": true,
                                "bg-zinc-50": index % 2 === 0
                            })}
                                key={tradeId}
                            >
                                {Object.entries(rowItem).map(([key, value]) => {
                                    return (
                                        <td className={clsx({
                                            "text-center p-4": true,
                                            //  text will be green if profitable
                                            "text-green-500": key === "P&L" && value > 0,
                                            "text-red-500": key === "P&L" && value < 0,
                                        })}>
                                            {key === "P&L" ? `$ ${value}` : value}
                                        </td>
                                    )
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    );
};

export default Table;
