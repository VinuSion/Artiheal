import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Reset from "./components/Reset";
import Home from "./components/Home";

import { Store } from "./Store";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)!;
  const { userInfo } = state;

  // Function to handle logout
  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
  };

  return (
    <BrowserRouter>
      <Routes>
        {userInfo ? (
          <>
            <Route
              path="home/*"
              element={<Home handleLogout={handleLogout} />}
            />
            <Route path="*" element={<Navigate to="/home/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password/:token" element={<Reset />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
