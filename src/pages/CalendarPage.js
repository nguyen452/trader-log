import React, {useState} from "react";

const CalendarPage = () => {
    // data to test the page
    const years = [2021, 2022, 2023, 2024];
    return (
        <main className="flex flex-col gap-4 p-4">
            <section>
                <h2>Year</h2>
                <ul>
                    {years.map(year => {
                        return <li key={year}>{year}</li>;
                    })}
                </ul>
            </section>
            <section>
                {/* main calendar goes here  */}
            </section>
            <section>
                {/* list of months */}
            </section>

        </main>
    )
}
