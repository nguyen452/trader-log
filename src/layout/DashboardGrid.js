import React from "react";
import Profits from "./profits/Profits";
const DashboardGrid = ({ gridItems }) => {
    return (
        <div className="bg bg-slate-50">
            <div className="h-full mx-auto container">
                <div className="flex flex-col md:grid md:grid-cols-12 gap-4 p-4">
                    {/* grid grid-cols-12 grid-rows-6 w-full p-4 gap-4 h-screen"> */}
                    <div className=" w-full md:col-span-6 xl:col-span-3 ">{gridItems.card1}</div>
                    <div className="w-full md:col-span-6 xl:col-span-3 ">{gridItems.card2}</div>
                    <div className="w-full  md:col-span-6 xl:col-span-3">{gridItems.card3}</div>
                    <div className="w-full  md:col-span-6 xl:col-span-3">{gridItems.card3}</div>
                    <div className="md:col-span-8">{gridItems.equityCurve}</div>
                    <div className="w-full md:col-span-4">
                        {gridItems.recentTrade}
                    </div>
                    <div className="md:col-span-12">{gridItems.dataTable}</div>
                    <div className="w-full md:col-span-12">
                        {gridItems.recentTradesWidget}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardGrid;
//   <div>
//  <Grid container spacing={2}>
// <Grid sx={{}} item xs={12} sm={6} md={4} xl:=col-span-{4}>
//   {gridItems.card1}
// </Grid>
// <Grid item xs={12} sm={6} md={4} xl:=col-span-{4}>
//   {gridItems.card2}
// </Grid>
// <Grid item xs={12} sm={6} md={4} xl:=col-span-{4}>
//   {gridItems.card3}
// </Grid>
// <Grid item xs={12} sm={12} md={8} xl:=col-span-{8}>
//   {gridItems.equityCurve}
// </Grid>
// <Grid item xs={12} sm={12} md={4} xl:=col-span-{4}>
//   {gridItems.recentTrade}
// </Grid>
// <Grid item xs={12} sm={12} md={12} xl:=col-span-{12}>
//   {gridItems.dataTable}
// </Grid>
// </Grid>
// </div>
