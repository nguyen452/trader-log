import React, { useEffect, useState, useMemo } from "react";
import CreateJournalCard from "../components/CreateJournalCard";
import JournalCard from "../components/JournalCard";
import DailyJournalEntry from "../components/DailyJournalEntry";
import Modal from "../components/common/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchJournalPageData,
    selectJournalDates,
    selectJournalPageNumber,
    changePage,
    selectJournalData,
    selectJournalIsLoading,
    selectJournalHasError,
    selectPaginatedDates
} from "../slice/journalSlice";
import { selectIsModalOpen, selectJournalEntry, selectJournalDate, openModal, closeModal} from "../slice/journalModalSlice";
import Pagination from "../components/common/Pagination";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import getTotalNumberOfPage from "../utils/getTotalNumberOfPage";
import calculateIntraDayProfitCurveData from "../utils/calculateIntraDayProfitCurveData";

const Journal = () => {
    //journalSliceState
    const show = 7;
    const dates = useSelector(selectJournalDates);
    const page = useSelector(selectJournalPageNumber);
    const data = useSelector(selectJournalData);
    const isLoading = useSelector(selectJournalIsLoading);
    const hasError = useSelector(selectJournalHasError);
    const paginatedDates = useSelector(selectPaginatedDates);
    //ModalSliceState
    const isModalOpen = useSelector(selectIsModalOpen);
    const journalEntry = useSelector(selectJournalEntry);
    const date = useSelector(selectJournalDate);
    const dispatch = useDispatch();
    const journalData = useSelector(selectJournalData);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchJournalPageData());
        };
        fetchData();
    }, [dispatch, page]);

    if (isLoading) {
        return <div>Loading...</div>;
    } else if (dates.length === 0) {
        return <div>No data available</div>;
    } else if (hasError) {
        return <div>Something went wrong...</div>;
    } else if (paginatedDates.length === 0) {
        return <div>No data available</div>;
    } else if (!data) {
        return <div>No data available</div>;
    }
    return (
        <main>
            <div>
                <CreateJournalCard />
            </div>
            <div className="mt-4">
                {paginatedDates.map((date) => {
                    const intraDayProfitCurveData =
                        calculateIntraDayProfitCurveData(
                            data[date].completeTradesInfo
                        );
                    return (
                       <>
                        <JournalCard
                            key={date}
                            date={date}
                            totalTrades={data[date].totalTrades}
                            winRate={data[date].winRate}
                            winners={data[date].totalWinningTrades}
                            losers={data[date].totalLosingTrades}
                            biggestWin={data[date].largestWin}
                            biggestLoss={data[date].largestLoss}
                            totalGrossProfit={data[date].totalGrossProfit}
                            totalGrossLoss={data[date].totalGrossLoss}
                            setIsViewNoteOpen={openModal}
                            profitLoss={data[date].totalProfit}
                            intraDayProfitCurve={intraDayProfitCurveData}
                            dailyTradesData={data[date].completeTradesInfo}
                        />
                       </>
                    );
                })}
                <Modal open={isModalOpen}>
                    <DailyJournalEntry onClose={closeModal} date={date} journalData={journalData[date]}/>
                </Modal>
            </div>
            <div className="flex justify-center items-center">
                <div className=" p-2 text-slate-500 hover:bg-slate-100 hover:cursor-pointer">
                    <ChevronLeftIcon
                        onClick={() => {
                            if (page > 1) {
                                dispatch(changePage(page - 1));
                            }
                        }}
                    />
                </div>
                <div>
                    <Pagination
                        currentPage={page}
                        totalPages={getTotalNumberOfPage(dates.length, show)}
                        action={changePage}
                    />
                </div>
                <div className="p-2 text-slate-500 hover:bg-slate-100 hover:cursor-pointer">
                    <ChevronRightIcon
                        onClick={() => {
                            if (
                                page < getTotalNumberOfPage(dates.length, show)
                            ) {
                                dispatch(changePage(page + 1));
                            }
                        }}
                    />
                </div>
            </div>
        </main>
    );
};

export default Journal;
