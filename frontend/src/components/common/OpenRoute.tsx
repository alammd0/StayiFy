import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store/app";

const OpenRoute = () => {
    const token = useSelector((state: RootState) => state.auth.token);
    const user = useSelector((state: any) => state.auth.user);
    console.log(user.accountType);

    return token && user.accountType === "USER" ? <Outlet /> : <Navigate to="/login" replace />;
};

export default OpenRoute;
