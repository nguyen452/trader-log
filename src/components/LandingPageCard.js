import React from "react";

const landingPageCard = ({ img, title, content }) => {
    return (
        <div className="md:flex flex-col gap-4 items-center justify-center">
            <div className="p-8 md:p-0">
                {img}
            </div>
            <div className="flex flex-col items-center p-4">
                <h2 className="text-slate-700 font-bold font-2xl">{title}</h2>
                <p className="leading-12 text-center md:text-left py-4">{content}</p>
            </div>
        </div>
    )
};

export default landingPageCard;
