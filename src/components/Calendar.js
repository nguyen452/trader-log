import React, { useState } from "react";
import clsx from "clsx";

function Calendar() {
  // current date the calendar is on (default is today)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date()); // date that is selected by the user

  //helper function to switch the month
  const switchMonth = (increment) => {
    if (increment) {
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
      );
    } else {
      setCurrentDate(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
      );
    }
  };
  //helper function to get the days to fully populate the calendar
  const getDaystoPopulateCalendar = (year, month) => {
    const dayOfWeekOfTheFirst = new Date(year, month, 1).getDay(); // return a value of 0-6 representing the day of the week of the first day of the month
    console.log(dayOfWeekOfTheFirst);
    let startDayCount = new Date(
      year,
      month,
      1 - dayOfWeekOfTheFirst
    ).getDate(); // get the date of the first day of the calendar
    console.log(startDayCount);
    if (dayOfWeekOfTheFirst !== 0) {
      month--;
    }

    let arrayofDays = [];
    for (let i = 0; i < 35; i++) {
      arrayofDays.push({
        day: new Date(year, month, startDayCount).getDate(),
        month: new Date(year, month, startDayCount).getMonth(),
        year: new Date(year, month, startDayCount).getFullYear(),
      });
      startDayCount++;
    }
    return arrayofDays;
  };

  return (
    <div className="bg-white rounded aspect-square container p-4">
      <div className="flex justify-between items-center mb-4">
      {/* Calendar Header */}
        <h1 className="text-xl font-semibold">
          {currentDate.toLocaleString("default", { month: "long" })}{" "}
          {currentDate.getFullYear()}
        </h1>
        <div>
          <button
            className="mx-3 text-xl text-slate-500 hover:bg-slate-100"
            onClick={() => switchMonth(false)}
          >
            {"<"}
          </button>
          <button
            className="mx-3 text-xl text-slate-500 hover:bg-slate-100"
            onClick={() => switchMonth(true)}
          >
            {">"}
          </button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 row-gap-4 py-4">
        {["M", "T", "W", "T", "F", "S", "S"].map((day) => (
          <div className="text-center font-medium" >{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 border border-slate-100 rounded-xl font-light aspect-square">
        {/* get days to to fully populate the calendar */}

        {getDaystoPopulateCalendar(
          currentDate.getFullYear(),
          currentDate.getMonth()
        ).map((date) => {
          const todaysDate = {
            year: new Date().getFullYear(),
            month: new Date().getMonth(),
            day: new Date().getDate(),
          };
          return (
            <div
              className="w-full h-full flex flex-col justify-center hover:cursor-pointer hover:bg-slate-50 aspect-square p-1"
              onClick={() =>
                setSelectedDate(new Date(date.year, date.month, date.day))
              }
            >
              <p className={clsx({
                "p-2 aspect-square flex items-center justify-center": true,
                // text will be blue if it is today
                "text-blue-500": date.year === todaysDate.year && date.month === todaysDate.month && date.day === todaysDate.day,
                //  text will be gray if it is not the current month
                "text-gray-300": date.month !== currentDate.getMonth(),
                // selected date will have white text and blue background when selected
                "text-white bg-blue-500 rounded-full": date.year === selectedDate.getFullYear() && date.month === selectedDate.getMonth() && date.day === selectedDate.getDate(),
              })} >
                {date.day}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
