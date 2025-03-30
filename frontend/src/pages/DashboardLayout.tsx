import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex">

            <Sidebar />
            
            <div className="p-6 w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
