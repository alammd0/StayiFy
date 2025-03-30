import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/core/Navbar"
import Profile from "./components/sidebar/Profile";
import DashboardLayout from "./pages/DashboardLayout";
import CreateProperty from "./components/sidebar/CreateProperty";
import MyProperties from "./components/sidebar/MyProperties";

function App() {

  const location = useLocation();
  const hideNavbarPart = ["/login", "/signup", "/dashboard/profile", "/dashboard/create-property", "/dashboard/my-properties"];

  return (
    <div>
      {/* <Navbar /> */}
      {!hideNavbarPart.includes(location.pathname) && <Navbar />}

      {/* <Home /> */}

      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create-property" element={<CreateProperty />} />
          <Route path="my-properties" element={<MyProperties />} />

        </Route>


      </Routes>
    </div>
  )
}

export default App
