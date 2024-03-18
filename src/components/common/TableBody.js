import React from "react";
import clsx from "clsx";

const TableBody = ({ data }) => {
    return (
        <tbody>
            {/* destructure tradeId from data  */}
            {data.map(({ trade_Id, id, ...rowItem }, index) => {
                return (
                    <tr
                        className={clsx({
                            "hover:bg-slate-100": true,
                            "bg-zinc-50": index % 2 === 0,
                        })}
                        key={trade_Id}
                    >
                        {Object.entries(rowItem).map(([key, value]) => {
                            return (
                                <td
                                    className={clsx({
                                        "text-center p-4": true,
                                        //  text will be green if profitable
                                        "text-green-500": key === "P&L" && value > 0,
                                        "text-red-500": key === "P&L" && value < 0,
                                    })}
                                >
                                    {key === "P&L" ? `$ ${value}` : value}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    )
};

export default TableBody;
