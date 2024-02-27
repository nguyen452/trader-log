import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import ProfitMiniAreaChart from "./ProfitsMiniAreaChart";
import JournalCardStatBox from "./JournalCardStatBox";
import TextEditor from "./common/TextEditor";
import BlueButton from "./common/BlueButton";


const DailyJournalEntry = ({ entry, onClose }) => {
    entry = {entry: "This is a test entry"}
    const intraDayProfitCurve = [
        {time: '0930', 'Accumulated Profits': 1000},
        {time: '1100', 'Accumulated Profits': 2000},
        {time: '1300', 'Accumulated Profits': 3000},
        {time: '1400', 'Accumulated Profits': 2500},
        {time: '1600', 'Accumulated Profits': 3500},
        // add more data as needed
    ];
        const data = [
            { name1: "Test1", value1: "Value1", name2: "Test2", value2: "Value2" },
            { name1: "Test3", value1: "Value3", name2: "Test4", value2: "Value4" },
            // add more testing data as needed
        ];

        const closeViewNote = () => {
            onClose(false);
        }

        return (
            <section className="flex flex-col gap-8 bg-white rounded-2xl p-4 ">
                <div className="flex items-center justify-between py-2 border-b-2 mx-4">
                    <h2 className="font-medium">
                        Daily Log
                    </h2>
                    <div className="hover:cursor-pointer hover:text-slate-600" onClick={closeViewNote}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex">
                        <div className="w-1/3 h-32">
                            <ProfitMiniAreaChart data={intraDayProfitCurve} yAxis={true} />
                        </div>
                        <div className="flex justify-between px-4">
                            {data.map((item, index) => {
                                const isLastItem = index === data.length - 1;
                                return <JournalCardStatBox title1={item.name1} value1={item.value1} title2={item.name2} value2={item.value2} isLastItem={isLastItem} />
                            })}
                            {/* <JournalCardStatBox title1="test" value1='test' title2={'test'} value2={"test"} /> */}
                        </div>
                    </div>
                </div >
                <div className="w-full p-4">
                    <TextEditor value={entry.entry} />
                </div>
                <div className="flex justify-end px-4">
                    <button className="bg-traderBlue h-12 w-28 text-white hover:bg-blue-400 rounded-2xl text-center ">
                        Save
                    </button>
                </div>
            </section>
        )
    }

    export default DailyJournalEntry;
