import React, { useState } from "react";
import Navbar from "../layout/Navbar";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectIsAuthenticated } from "../slice/authSlice";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [loading, setLoadingState] = useState(false);
    const [loginErrorState, setLoginErrorState] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log(isAuthenticated)


    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault();
        //post to server
        await dispatch(login({ username, password }));
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            setLoginErrorState(true);
        }
    };

    return (
        <div>
            <main className="flex h-screen container mx-auto bg-slate-100 text-slate-800 py-16 ">
                <section className="flex flex-col w-1/2 p-4">
                    <img src="loginPic.png" alt="people discussing trades" />
                </section>
                <section className="flex flex-col w-1/2 px-20">
                    <div className="md:w-3/4">
                        <h1 className="text-4xl font-bold py-4">
                            Welcome Back
                        </h1>
                        {/* start of form */}
                        <p className="text-slate-500 pb-4">Login to continue</p>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="w-full">
                                <label htmlFor="username">Username</label>
                                <div className="flex bg-white items-center h-12 relative mt-2">
                                    <span className="ml-4 absolute">
                                        <PersonIcon />{" "}
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        className="pl-12 autofill:bg-white w-full bg-white h-full"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="password">Password</label>
                                <div className="flex bg-white items-center h-12 relative mt-2">
                                    <span className="ml-4 absolute">
                                        <LockIcon />{" "}
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        className="pl-12 w-full bg-white h-full"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between mt-2">
                                <div className="flex items-center space-x-2">
                                    <input
                                        className="w-4 h-4  border-0 rounded cursor-pointer "
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        onChange={(e) => {
                                            setRemember(!remember);
                                        }}
                                    />
                                    <label htmlFor="remember">
                                        Remember me
                                    </label>
                                </div>
                                <div>
                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-traderBlue text-white h-12 w-full flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointer mt-2"
                            >
                                Sign in
                            </button>
                            <div>
                                {loginErrorState ? <p className="text-red-500">
                                    Invalid username or password
                                </p> : ""}
                            </div>
                        </form>
                        <div className="flex space-x-2 mt-4">
                            <p> New User?</p>
                            <p className="text-blue-500">
                                <Link to="/sign-up">Sign up</Link>
                            </p>
                        </div>
                    </div>
                </section>
                <div></div>
            </main>
        </div>
    );
};

export default Login;
