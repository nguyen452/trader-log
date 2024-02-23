import React from "react";
import CreateJournalCard from "../components/CreateJournalCard";
import JournalCard from "../components/JournalCard";

const Journal = () => {
    let date = 'Thu, 10/14/2021'
    let profitLoss = 1000
    return (
        <main>
            <div>
                <CreateJournalCard  />
            </div>
            <div>
                <JournalCard date = {date} profitLoss ={`$ ${profitLoss}`} />
                {/* hold trade journal */}
                {/* paginate */}
            </div>

        </main>
    );
};

export default Journal;
