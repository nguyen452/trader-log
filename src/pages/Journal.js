import React, {useEffect, useState} from "react";
import CreateJournalCard from "../components/CreateJournalCard";
import JournalCard from "../components/JournalCard";
import DailyJournalEntry from "../components/DailyJournalEntry";
import Modal from "../components/common/Modal";


const Journal = () => {
    const [isViewNoteOpen, setIsViewNoteOpen] = useState(false);
    let date = 'Thu, 10/14/2021'
    let profitLoss = 1000
    return (
        <main>
            <div>
                <CreateJournalCard  />
            </div>
            <div>
                <JournalCard date = {date} profitLoss ={`$ ${profitLoss}`} setIsViewNoteOpen={setIsViewNoteOpen} />
                {/* hold trade journal */}
                {/* paginate */}
            </div>
            <Modal open={isViewNoteOpen}>
                <DailyJournalEntry onClose={setIsViewNoteOpen} />
            </Modal>
        </main>
    );
};

export default Journal;
