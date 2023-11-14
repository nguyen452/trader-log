import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../slice/signUpSlice";

import LoadingSpinner from "../components/common/LoadingSpinner";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("")
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.createUser.isLoading);

    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault();
        //dispatch the thunk
        const user = {
            firstName,
            lastName,
            username,
            email,
            password
        }

        const response = await dispatch(signUp(user))

        console.log(response)

        if (!response.error) {
            navigate("/login")
        } else {
            setError(true)
        }
        // take the response
        // take user to log in page to authenticate
    };

    return (
        <div className="bg-slate-100 flex flex-col h-full justify-center">
            <main className="flex text-slate-800 container mx-auto mb-80 ">
                <section className="w-1/2 p-4 hidden lg:flex lg:flex-col justify-center">
                    <img
                        src="firefly2.png"
                        alt="people discussing trades"
                        className="shadow-lg rounded-md"
                    />
                </section>
                <section className="flex flex-col lg:w-1/2 p-8 w-full">
                    <div className="">
                        <h1 className="text-2xl md:4xl font-bold py-4">Sign up</h1>
                        {/* start of form */}
                        <p className="text-slate-500 pb-4">
                            Create your free Trader Log account
                        </p>
                        <form
                            className="flex flex-col gap-4"
                            onSubmit={handleSubmit}
                        >
                            <div className="w-full">
                                <label htmlFor="firstName">First Name</label>
                                <div className="flex bg-white items-center h-12 mt-1 md:mt-2">
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        placeholder="First Name"
                                        className="pl-4 autofill:bg-white w-full bg-white h-full"
                                        value={firstName}
                                        onChange={(e) => {
                                            setFirstName(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="lastName">Last Name</label>
                                <div className="flex bg-white items-center h-12 mt-1 md:mt-2">
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        placeholder="Last Name"
                                        className="pl-4 autofill:bg-white w-full bg-white h-full"
                                        value={lastName}
                                        onChange={(e) => {
                                            setLastName(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="username">Username</label>
                                <div className="flex bg-white items-center h-12 mt-1 md:mt-2">
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder="Username"
                                        className="pl-4 autofill:bg-white w-full bg-white h-full"
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="email">Email</label>
                                <div className="flex bg-white items-center h-12 mt-1 md:mt-2">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Email"
                                        className="pl-4 autofill:bg-white w-full bg-white h-full"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <div className="w-full">
                                <label htmlFor="password">Password</label>
                                <div className="flex bg-white items-center h-12 mt-1 md:mt-2">
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        className="pl-4 w-full bg-white h-full"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        required={true}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="bg-traderBlue text-white h-12 w-full flex items-center justify-center rounded-md hover:bg-blue-400 cursor-pointermt-1 md:mt-2 shadow-md"
                            >
                                {isLoading ? <div className="flex items-center space-x-4"><LoadingSpinner /><p className="text-lg">Loading ...</p></div> : "Sign up"}
                            </button>
                            {error && <p>There was an error with creating your account</p>}
                        </form>
                        <div className="flex space-x-2 mt-4">
                            <p> Already a user?</p>
                            <p className="text-blue-500">
                                <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default SignUp;
