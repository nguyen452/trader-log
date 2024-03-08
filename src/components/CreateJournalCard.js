import React, { useEffect } from "react";
import JournalDatePicker from "./JournalDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createJournalEntry, setCreateEntryDate, selectCreateEntryDate } from "../slice/journalSlice";

const CreateJournalCard = () => {
    const dispatch = useDispatch();
    const entryDate = useSelector(selectCreateEntryDate);


    const handleClick = async () => {
        await dispatch(createJournalEntry({ date: entryDate, entry: null, hasTrade: false }));
    };

    return (
        <div className="flex gap-4 p-4 items-center justify-end">
            <h2>Create Journal Entry</h2>
            <JournalDatePicker setDate={setCreateEntryDate} />
            <button className="bg-traderBlue text-white h-8 w-28 flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointer shadow-md" onClick={ handleClick }>
                Add Entry
            </button>
        </div>
    );
};

export default CreateJournalCard;
