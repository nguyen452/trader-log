import React from "react";
import BlueButton from "../components/common/BlueButton";
import { Link } from "react-router-dom";
import Navbar from "../layout/Navbar";
import LandingPageCard from "../components/LandingPageCard";
import Footer from "../layout/Footer";

const LandingPage = () => {
    return (
        <div className="flex flex-col justify-between h-full md:h-screen bg-white">
            <main className=" flex flex-grow bg-slate-100">
                <div
                    id="hero"
                    className="flex justify-center items-center py-14 container mx-auto"
                >
                    <div className="flex flex-col gap-4 p-6 ">
                        <h2 className="text-3xl md:5xl text-slate-700 font-bold">
                            Unlock Your Trading Potential
                        </h2>
                        <h6 className="text-slate-500">Analyze, Reflect, and Evolve with Every Trade</h6>
                        <p className="text-left">
                            Upload your stock trades and dive deep into
                            comprehensive analytics. Take control of your
                            trading journey and continuously refine your
                            strategies.
                        </p>
                        <Link to="/signup">
                            <BlueButton text="Get Started" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <img
                            src="/journalAndCharts.png"
                            alt="journal and charts"
                        />
                    </div>
                </div>
            </main>
            <section className="flex flex-col gap:4 md:flex-row md:flex-grow md:space-x-4 mx-auto items-center justify-center container">
                <div className="h-full md:flex flex-col justify-center md:h-96  ">
                    <LandingPageCard
                        title="Comprehensive Trade Analysis"
                        content="Upload your stock trades and instantly receive in-depth analytics about
                        your performance."
                        img={<img  src="/analytics.png" alt="graphs" />}
                    />
                </div>
                <div className="h-full md:flex flex-col justify-center md:h-96 ">
                    <LandingPageCard
                        title="Personalized Trading Journal"
                        content="Reflect on your trading decisions
                         and track your emotional responses to different trades."
                        img={<img className="w-full h-auto" src="/journal.png" alt="journal" />}
                    />
                </div>
                <div className="h-full md:flex flex-col justify-center md:h-96">
                    <LandingPageCard
                        title="Historical Trade Review"
                        content="Look back on past trades with and interactive calendar, intuitive filters
                         and sorting options."
                        img={<img src="calendarMockup.png" alt="calendar" />}
                    />
                </div>
            </section>
            <section className="bg-slate-100 text-center p-6 flex-grow">
                <div className="flex flex-col p-4 items-center">
                    <h2 className="text-2xl text-slate-700 font-bold text-center my-2 ">
                        Start Your Trading Journey Today
                    </h2>
                    <h6 className="my-4">
                        Sign up for free and take control of your trading
                        journey
                    </h6>
                    <Link to="/signup">
                        <BlueButton text="Get Started" />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
