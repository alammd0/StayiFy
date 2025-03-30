import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store/app";
import { logout } from "../../services/operations/authApi";
import { useState } from "react";

const Navbar = () => {

    const token = useSelector((state: any) => state.auth.token);
    console.log(token);


    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutModal, setLogoutModal] = useState(false);

    function logoutHandler() {
        dispatch(logout(navigate));
        setLogoutModal(false);
    }

    return (
        <div className="bg-slate-600 border-b-red-300 border-b-2 shadow-2xl">

            <div className="h-16 flex justify-between items-center mx-auto max-w-[1180px]">
                <div className="text-xl uppercase font-bold text-slate-200 cursor-pointer">
                    <Link to="/">
                        StayIfy
                    </Link>
                </div>

                <div>
                    {
                        token == null && (
                            <div className="flex gap-16">
                                <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/signup">
                                    <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Sign Up</button>
                                </Link>

                                <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/login">
                                    <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Log In</button>
                                </Link>
                            </div>
                        )
                    }

                    {
                        token != null && (
                            <div className="flex gap-16">
                                <button className="text-slate-100 text-lg cursor-pointer font-semibold" onClick={() => setLogoutModal(true)} >Logout</button>

                                <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/dashboard">
                                    <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Dashboard</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>

            {
                logoutModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-blue-950 bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-4">Are you sure you want to logout?</h2>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={logoutHandler}
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    Yes, Logout
                                </button>
                                <button
                                    onClick={() => setLogoutModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>

    )
}




export default Navbar
