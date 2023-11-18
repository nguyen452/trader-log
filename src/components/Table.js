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
                    "bg-white"
                )}
            >
                <thead className="">
                    <tr className="bg-zinc-100 text-zinc-700">
                        {Object.keys(data[0]).map((columnName) => (
                            <th className="p-4" key={columnName}>
                                {" "}
                                {columnName}{" "}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((rowItem) => {
                        return (
                            <tr>
                                {Object.values(rowItem).map((dataPoint) => {
                                    return (
                                        <td className="text-center p-4">
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
