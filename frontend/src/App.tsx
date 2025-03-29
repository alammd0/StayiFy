import {Route, Routes, useLocation } from "react-router-dom"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Navbar from "./components/core/Navbar"

function App() {

  const location = useLocation();
  const hideNavbarPart = ["/login", "/signup"];

  return (
    <div>
      {/* <Navbar /> */}
      {!hideNavbarPart.includes(location.pathname) && <Navbar />}

      {/* <Home /> */}



      <Routes>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
