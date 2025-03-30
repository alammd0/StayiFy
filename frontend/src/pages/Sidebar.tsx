import { Link, useLocation } from "react-router-dom"
import { useState } from "react";

const Sidebar = () => {

    const location = useLocation();
    const [active, setActive] = useState(location.pathname);

    return (
        <div className="w-[300px] min-h-screen bg-slate-600 flex flex-col gap-5 pt-10 pl-10 pr-10">
            <div className="text-xl uppercase font-bold text-slate-200 cursor-pointer bg-slate-400 text-center px-1 py-2 rounded-sm">
                <Link to="/">
                    StayIfy
                </Link>
            </div>

            <div className="flex flex-col gap-5">
                <div className={`text-lg font-semibold text-slate-300 ${active === "/dashboard/profile" && "bg-slate-400 text-slate-600 pl-3 px-1 py-1 rounded-sm"}`}>
                    <Link to="/dashboard/profile" onClick={() => setActive("/dashboard/profile")}>Profile</Link>
                </div>
                <div className={`text-lg font-semibold text-slate-300 ${active === "/dashboard/create-property" && "bg-slate-400 text-slate-600 pl-3 px-1 py-1 rounded-sm"}`} >
                    <Link to="/dashboard/create-property" onClick={() => setActive("/dashboard/create-property")}>Create Property</Link>
                </div>

                <div className={`text-lg font-semibold text-slate-300 ${active === "/dashboard/my-properties" && "bg-slate-400 text-slate-600 pl-3 px-1 py-1 rounded-sm"}`} >
                    <Link to="/dashboard/my-properties" onClick={() => setActive("/dashboard/my-properties")}>My Properties</Link>
                </div>

                <div>
                    <button className="text-lg font-semibold text-slate-600 bg-slate-400 text-center px-3 py-1 rounded-sm">
                        Logout
                    </button>
                </div>
            </div>

        </div >
    )
}

export default Sidebar
