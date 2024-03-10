import React, { useState, useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import DailyAreaCurve from "./DailyAreaCurve";
import JournalCardStatBox from "./JournalCardStatBox";
import TextEditor from "./common/TextEditor";
import { useSelector, useDispatch } from "react-redux";
import { updateJournalEntry, getJournalEntryByDate, selectJournalEntry, setJournalEntry } from "../slice/journalModalSlice";
import calculateIntraDayProfitCurveData from "../utils/calculateIntraDayProfitCurveData";
import { selectJournalData } from "../slice/journalSlice";




const DailyJournalEntry = ({ onClose, date }) => {
    const dispatch = useDispatch();
    let journalEntryData = useSelector(selectJournalEntry);
    const journalData = useSelector(selectJournalData)[date];
    const [ journalEntryText, setJournalEntryText ] = useState(journalEntryData);


    useEffect(() => {
        const fetchJournalData = async () => {
            console.log(date)
            await dispatch(getJournalEntryByDate(date));
        }
        fetchJournalData();
    }, [dispatch, date])

    useEffect(() => {
        setJournalEntryText(journalEntryData);

    }, [journalEntryData])

    const intraDayProfitCurve = calculateIntraDayProfitCurveData(journalData.completeTradesInfo);
    const data = [
        {name1: 'Total Trades', value1: journalData.totalTrades, name2: 'Win Rate', value2: journalData.winRate},
        {name1: 'Winners', value1: journalData.totalWinningTrades, name2: 'Losers', value2: journalData.totalLosingTrades},
        {name1: 'Gross Profit', value1: `$ ${journalData.totalGrossProfit}`, name2: 'Gross Loss', value2: `$ ${journalData.totalGrossLoss}`},
    ]

    const closeViewNote = () => {
        dispatch(onClose());
    }

    const handleSave = async() => {
        dispatch(setJournalEntry(journalEntryText));
        await dispatch ( updateJournalEntry( { date: date, entry: journalEntryText}))
    }

        return (
            <section className="flex flex-col gap-8 bg-white rounded-2xl p-4 w-2/3 text-md ">
                <div className="flex items-center justify-between py-2 border-b-2 mx-4">
                    <h2 className="font-medium">
                        Daily Log
                    </h2>
                    <div className="hover:cursor-pointer hover:text-slate-600" onClick={closeViewNote}>
                        <CloseIcon />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex w-full">
                        <div className="w-1/3 h-36">
                            <DailyAreaCurve data={intraDayProfitCurve} yAxis={true} />
                        </div>
                        <div className="flex justify-between w-2/3">
                            {data.map((item, index) => {
                                const isLastItem = index === data.length - 1;
                                return <JournalCardStatBox title1={item.name1} value1={item.value1} title2={item.name2} value2={item.value2} isLastItem={isLastItem} />
                            })}
                            {/* <JournalCardStatBox title1="test" value1='test' title2={'test'} value2={"test"} /> */}
                        </div>
                    </div>
                </div >
                <div className="w-full p-4">
                    <TextEditor value={journalEntryText} onChange={setJournalEntryText} />
                </div>
                <div className="flex justify-end px-4">
                    <button className="bg-traderBlue h-12 w-28 text-white hover:bg-blue-400 rounded-2xl text-center " onClick={handleSave}>
                        Save
                    </button>
                </div>
            </section>
        )
    }

    export default DailyJournalEntry;
