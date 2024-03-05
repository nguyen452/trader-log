import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const TradesDataGrid = ({ tradeData }) => {
  const columns = [
    { field: "date", headerName: "Date", width: 100 },
    { field: "side", headerName: "Side", width: 100 },
    { field: "symbol", headerName: "Symbol", width: 100 },
    { field: "Tags", headerName: "Tags", width: 100 },
    { field: "P&L", headerName: "P&L", width: 100 },
    { field: "Fees", headerName: "Fees", width: 100 },
    { field: "Volume", headerName: "Volume", width: 100 },
    { field: "Executions", headerName: "Executions", width: 100 },
  ];
    const rows = tradeData.map((trade) => {
        return {
        id: trade.id,
        date: trade.date,
        side: trade.side,
        symbol: trade.symbol,
        Tags: trade.Tags,
        "P&L": trade["P&L"],
        Fees: trade.Fees,
        Volume: trade.Volume,
        Executions: trade.Executions,
        };
    });
    return (
        <div className="w-full h-96 rounded-md shadow-md bg-white">
            <DataGrid
                rows={rows}
                columns={columns}
                autoPageSize={true}

            />
        </div>
    )
};

export default TradesDataGrid;
