import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch } from "react-redux";
// import { updateSearchTerm } from "./searchSlice";

const SearchBar = ({ pages, data }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = () => {
        // dispatch(updateSearchTerm(searchTerm));
    };
    return (
        <form
            className="flex bg-white rounded-full h-8 justify-between items-center"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(searchTerm);
            }}
        >
            <SearchIcon fontSize="medium" className="text-gray-500 text-xl mx-3" />
            <input
                type="text"
                placeholder={`Search ${pages}`}
                className="w-96 focus:outline-blue-500 h-8 flex-grow rounded-r-full p-4"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                }}
            />
            <div className="hover:bg-slate-200 rounded-r-full h-8 flex items-center">
                {searchTerm === "" ? null : (
                    <ClearIcon
                        className="text-gray-500 text-2xl mx-2 hover:cursor-pointer"
                        onClick={() => {
                            // dispatch(updateSearchTerm(""));
                            setSearchTerm((prev) => (prev = ""));
                        }}
                    />
                )}
            </div>
        </form>
    );
};

export default SearchBar;
