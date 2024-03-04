import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";

const ButtonWithDropDownMenu = ({ name, list, action }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const dispatch = useDispatch();
    const menuRef = useRef(null);

    const handleAction = (item) => {
        dispatch(action(item));
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <div className="relative inline-block text-left" ref={menuRef}>
            {/* <!-- This is the button that users click to toggle the dropdown menu. --> */}
            <div>
                <button
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <p className="px-4">{name}</p>
                    {/* <!-- Heroicon name: chevron-down --> */}
                    <svg
                        className="-mr-1 h-5 w-5 text-slate-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </button>
            </div>
            {/*
  <!-- This is the dropdown menu itself, which is absolutely positioned relative to its parent container. --> */}
            <div
                class={clsx(
                    "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
                    {
                        hidden: !isMenuOpen,
                    }
                )}
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabindex="-1"
            >
                {list.map((item) => {
                    return (
                        <div
                            className="p-2 font-light text-center text-sm text-slate-400 hover:bg-slate-50 hover:cursor-pointer hover:text-slate-700"
                            key={item}
                            onClick={() => handleAction(item)}
                        >
                            {item}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ButtonWithDropDownMenu;
