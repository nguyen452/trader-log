import React from "react";
// import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { NavLink, Outlet } from "react-router-dom";
import Footer from "../layout/Footer";
import Navbar from "../layout/Navbar";

const Root = () => {
  return (
    <section className="flex flex-col h-full md:h-screen w-full">
      <Navbar />
      <Outlet className="bg-slate-100 flex-grow w-full" />
      <Footer />
    </section>
  );
};

export default Root;
