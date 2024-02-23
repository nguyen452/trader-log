import React from "react";
import JournalDatePicker from "./JournalDatePicker";

const CreateJournalCard = () => {
    return (
        <div className="flex gap-4 p-4 items-center">
            <h2>
                Create Journal Entry
            </h2>
            <JournalDatePicker />
            <button className="bg-traderBlue text-white h-8 w-28 flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointer shadow-md">
                Add Entry
            </button>
        </div>
    );
}

export default CreateJournalCard;
