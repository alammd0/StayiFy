import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const Navbar = () => {

    const token = useSelector((state: any) => state.auth.token);
    console.log(token);

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
                                <button className="text-slate-100 text-lg cursor-pointer font-semibold">Logout</button>

                                <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/profile">
                                    <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Profile</button>
                                </Link>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar
