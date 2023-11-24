import SideBarLink from "../components/common/SideBarLink";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import TableViewIcon from '@mui/icons-material/TableView';
import { useParams } from "react-router-dom";

const Sidebar = () => {
  const { userId } = useParams();
  return (
    <div className="flex flex-col w-52 h-full shadow-right" >
      <div id="logo" className="flex text-slate-600 text-2xl m-3 items-center w-48">
        <img src="/traderLogo.svg" alt="logo" className="h-20 w-16" />
        <p className="text-xl font-semibold">Trader Log</p>
      </div>
      <div className="flex flex-col mt-28 m h-72 justify-between items-center">
        <SideBarLink text="Dashboard" link={`/user/${userId}/dashboard`} icon={<GridViewOutlinedIcon className="h-5 w-5 mr-3" />} />
        <SideBarLink text="Trade log" link={`/user/${userId}/trade-log`} icon={<TableViewIcon className="h-5 w-5 mr-3" />} />
        <SideBarLink text="Reports" link={`/user/${userId}/reports`} icon={<AnalyticsOutlinedIcon className="h-5 w-5 mr-3" />} />
        <SideBarLink text="Calendar" link={`/user/${userId}/calendar`} icon={< CalendarMonthOutlinedIcon className="h-5 w-5 mr-3" />} />
        <SideBarLink text="Journal" link={`/user/${userId}/journal`} icon={<FeedOutlinedIcon className="h-5 w-5 mr-3" />} />
        <SideBarLink text="Import" link={`/user/${userId}/import`} icon={<StorageRoundedIcon className="h-5 w-5 mr-3" />} />
      </div>
    </div>
  )
}
export default Sidebar;
