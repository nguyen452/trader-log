import React from "react";

const Profile = () => {
    const userName = "John Doe";
    return (
        <>
          <div className="flex justify-center items-center h-14 px-4">
            <div className="flex items-center mr-4">
                <img src="\profileImageDemo.svg" alt="user-profile" className="w-12 h-12 rounded-full" />
                <div className="ml-3">
                    <p className="text-sm font-medium">{userName}</p>
                </div>
            </div>
            <button>
                Logout
            </button>
         </div>
         </>
    )
};

export default Profile;
