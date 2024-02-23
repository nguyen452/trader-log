import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../slice/authSlice";

const Profile = () => {
    const apiURL = "http://localhost:4000";
    const userName = "John Doe";
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logout = async() => {
        const response = await fetch(`${apiURL}/auth/logout`, {
            method: "POST",
        })
        if(response.status === 200){
            dispatch(logoutAction());
            navigate("/");
            console.log("User is logged out");
        }

    }
    return (
        <>
          <div className="flex justify-center items-center h-14 px-4">
            <div className="flex items-center mr-4">
                <img src="\profileImageDemo.svg" alt="user-profile" className="w-12 h-12 rounded-full" />
                <div className="ml-3">
                    <p className="text-sm font-medium">{userName}</p>
                </div>
            </div>
            <button onClick={logout}>
                Logout
            </button>
         </div>
         </>
    )
};

export default Profile;
