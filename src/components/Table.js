import React from "react";
import clsx from "clsx";

const Table = ({ data, title }) => {
    if (!data) {
        return <div>Loading...</div>;
    } else if (data.length === 0) {
        return <div>No trades on this day</div>;
    }
    console.log(data)
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
                        {Object.keys(data[0]).map((columnName) => (
                            <th className="p-4 font-medium" key={columnName}>
                                {" "}
                                {columnName}{" "}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowItem, index) => {
                        return (
                            <tr className={clsx({
                                "hover:bg-slate-100": true,
                                "bg-zinc-50": index % 2 === 0
                            })}>
                                {Object.values(rowItem).map((dataPoint, index) => {
                                    return (
                                        <td className={clsx({
                                            "text-center p-4": true,
                                        })}>
                                            {dataPoint}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
    );
};

export default Table;
