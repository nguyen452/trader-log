import React from "react";
import "./App.css";
import {
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Root from "./pages/Root";
import DashBoard from "./pages/DashBoard";
import Import from "./pages/Import";
import { Provider } from "react-redux";
import LandingPage from "./pages/landingPage";
import Login from "./pages/Login";
import { store } from "./app/store.js";
import SignUp from "./pages/signUp.js";
import SignedIn from "./pages/SignedIn.js";
import TradeLog from "./pages/TradeLog.js";
import Journal from "./pages/Journal.js";
import CalendarPage from "./pages/CalendarPage.js";
import Trade from "./pages/Trade.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<Root />}>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Route>
            <Route path="user/:userId" element={<SignedIn />}>
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="import" element={<Import />} />
                <Route path="trade-log" element={<TradeLog />} />
                <Route path="journal" element={<Journal />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="reports" element={<Trade />} />
            </Route>
        </>
    )
);

const App = () => {
    return (
        <Provider store={store}>
                <RouterProvider router={router} />
        </Provider>
    );
};

export default App;
