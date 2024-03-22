import React from "react";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const TableBody = ({ data, isRowClickable }) => {
    const { userId } = useParams();
    console.log(userId)
    const navigate = useNavigate();
    const handleClick = (trade_id) => {
        navigate(`/user/${userId}/trade/${trade_id}`);
    }

    return (
        <tbody>
            {/* destructure tradeId from data  */}
            {data.map(({ trade_Id, id, ...rowItem }, index) => {
                return (
                    <tr
                        className={clsx({
                            "hover:bg-slate-100": true,
                            "bg-zinc-50": index % 2 === 0,
                            "cursor-pointer": isRowClickable,
                        })}
                        key={trade_Id}
                        onClick = {isRowClickable ? () => handleClick(trade_Id) : null}
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
