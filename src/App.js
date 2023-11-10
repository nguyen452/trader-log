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
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Provider } from "react-redux";
import LandingPage from "./pages/landingPage";
import Login from "./pages/Login";
import { store } from "./app/store.js";
import SignUp from "./pages/signUp.js";
import SignedIn from "./pages/SignedIn.js";

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
            </Route>
        </>
    )
);

const App = () => {
    return (
        <Provider store={store}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <RouterProvider router={router} />
            </LocalizationProvider>
        </Provider>
    );
};

export default App;
