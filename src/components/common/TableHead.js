import React from "react";
import snakeCaseToTitleCase from "../../utils/snakeCaseToTitleCase";

const TableHead = ({ data }) => {
    // takes and array of data
    // from the first element of the array, extract the keys
    data = data[0];
    let column= Object.keys(data).splice(1);
    let columnsArray = column.map((columnName) => {
        return {
            label: snakeCaseToTitleCase(columnName),
            accessor: columnName
        }
    });

    return (
        <thead className="font-light">
            <tr className="bg-blue-50 text-zinc-700 text-base">
                {/* take the first element of data array and extract the keys as header */}
                { columnsArray.map((columnHeader) => (
                        <th className="p-4 font-medium" key={columnHeader.accessor}>
                            {columnHeader.label}
                        </th>
                    ))}
            </tr>
        </thead>
    );
};

export default TableHead;
