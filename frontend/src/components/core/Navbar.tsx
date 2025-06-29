import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/app";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../../services/operations/authApi";
import LogoutModal from "../common/LogoutModal";
import { setToken } from "../../redux/slices/authSlice"; 

const Navbar = () => {
  const token = useSelector((state: any) => state.auth.token);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [loading, setLoading] = useState(true); // <-- NEW

  // Restore token from localStorage on mount
  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      dispatch(setToken(localToken)); 
    }
    setLoading(false); 
  }, [dispatch]);

  const logoutHandler = () => {
    dispatch(logout(navigate));
    setLogoutModal(false);
  };


  // Don't show navbar until token loading is done
  if (loading) return null; 

  return (
    <div className="bg-slate-600 border-b-red-300 border-b-2 shadow-2xl fixed top-0 left-0 w-full z-50">
      <div className="h-16 flex justify-between items-center mx-auto max-w-[1180px]">
        <div className="text-xl uppercase font-bold text-slate-200 cursor-pointer">
          <Link to="/">StayIfy</Link>
        </div>

        <div>
          {token == null ? (
            <div className="flex gap-16">
              <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/signup">
                <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Sign Up</button>
              </Link>
              <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/login">
                <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Log In</button>
              </Link>
            </div>
          ) : (
            <div className="flex gap-16">
              <button
                className="text-slate-100 text-lg cursor-pointer font-semibold"
                onClick={() => setLogoutModal(true)}
              >
                Logout
              </button>
              <Link className="text-slate-100 text-lg cursor-pointer font-semibold" to="/dashboard">
                <button className="cursor-pointer bg-slate-400 px-4 py-1 rounded-2xl">Dashboard</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {logoutModal && (
        <LogoutModal logoutHandler={logoutHandler} setLogoutModal={setLogoutModal} texts="Logout" />
      )}
    </div>
  );
};

export default Navbar;
