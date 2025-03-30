
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Profile = () => {

    const location = useLocation();

    const user = useSelector((state: any) => state.auth.user);
    console.log(user)

    const token = useSelector((state : any) => state.auth.token);
    console.log(token)

    return (
        <div className="flex flex-col gap-5">

            <div className="text-lg font-semibold text-slate-300 tracking-[0.09em] font-stretch-extra-condensed">
                {location.pathname}
            </div>

            <div className="pl-8 flex flex-col gap-3">
                <h1 className="text-lg font-semibold text-slate-500">User Basic Information : </h1>

                <div className="pl-8 flex flex-col gap-3">
                    <p className="text-md font-semibold text-slate-500">Account Types : {user.accountType}</p>
                    <p className="text-md font-semibold text-slate-500">Name : {user.name}</p>
                    <p className="text-md font-semibold text-slate-500">Email : {user.email}</p>
                    <p className="text-md font-semibold text-slate-500">Phone Number : {user.phoneNumber}</p>
                </div>
            </div>

            <div className="pl-8">
                <button className="text-lg font-semibold text-slate-600 bg-red-400 text-center px-3 py-1 rounded-sm">Delete Account</button>
            </div>

        </div>
    )
}

export default Profile
