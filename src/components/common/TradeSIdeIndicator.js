import React from "react";

const TradeSideIndicator = ({ side }) => {
    return (
        <div className={`flex justify-center w-14 rounded text-white font-bold ${side === 'B' ? 'bg-softGreen' : 'bg-softRed'}`}>
            {side === 'B' ? <p>Long</p> : <p>Short</p>}
        </div>
    )
}

export default TradeSideIndicator;
