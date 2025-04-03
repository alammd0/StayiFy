import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/core/Navbar"
import Profile from "./components/sidebar/Profile";
import DashboardLayout from "./pages/DashboardLayout";
import CreateProperty from "./components/sidebar/CreateProperty";
import MyProperties from "./components/sidebar/MyProperties";
import MyPropertiesDetails from "./components/sidebar/MyPropertiesDetails";
import HostRoute from "./components/common/PrivateRoute";
import Home from "./pages/Home";
import OpenRoute from "./components/common/OpenRoute";
import Cart from "./components/core/cart/Cart";
import MyBooking from "./components/core/cart/MyBooking";

function App() {

  const location = useLocation();
  console.log(location.pathname[-1]);
  const hideNavbarPart = ["/login", "/signup", "/dashboard/profile", "/dashboard/create-property", "/dashboard/my-properties", "/dashboard/my-booking"];

  const currentPath = location.pathname;

  const shouldHideNavbar = hideNavbarPart.some(path => currentPath.startsWith(path));

  return (



    <div>
      {/* <Navbar /> */}
      {!shouldHideNavbar && <Navbar />}

      {/* <Home /> */}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />


        <Route path="/dashboard" element={<DashboardLayout />}>

          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<Profile />} />

          <Route element={<HostRoute />}>
            <Route path="create-property" element={<CreateProperty />} />
            <Route path="my-properties" element={<MyProperties />} />
            <Route path="my-properties/:id" element={<MyPropertiesDetails />} />
          </Route>

          <Route path="my-booking/:id" element={<MyBooking />} />
        </Route>

        <Route element={<OpenRoute />}>
          <Route path="/property/:id" element={<MyPropertiesDetails />} />
          <Route path="/property/:id/cart" element={<Cart />} />
        </Route>


      </Routes>
    </div>
  )
}

export default App
