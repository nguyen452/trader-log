import React from "react";
import clsx from "clsx";
import TableHead from "./common/TableHead";
import TableBody from "./common/TableBody";

const Table = ({ data, rowPerPage, isRowClickable }) => {
    if (!data) {
        return <div>Loading...</div>;
    } else if (data.length === 0) {
        return <div>There are no trades </div>;
    }

    //paginate the data

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
            <TableHead data={data} />
            <TableBody data={data} isRowClickable={isRowClickable} />
            </table>
    );
};

export default Table;
