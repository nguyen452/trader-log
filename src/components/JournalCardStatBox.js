import clsx from "clsx";
const StatsBox = ({ title1, value1, title2, value2, isLastItem }) => (
    <div className={clsx("flex flex-col justify-between h-32 w-full px-4", {"border-r-2": !isLastItem})}>
        <div className="flex justify-between w-32">
            <h6 className="text-slate-400">{title1}</h6>
            <p className="font-medium">{value1}</p>
        </div>
        <div className="flex justify-between w-32">
            <h6 className="text-slate-400">{title2}</h6>
            <p className="font-medium">{value2}</p>
        </div>
    </div>
);

export default StatsBox;
