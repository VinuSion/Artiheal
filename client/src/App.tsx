import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/components/public-pages/LandingPage";
import Login from "@/components/public-pages/Login";
import SignUp from "@/components/public-pages/SignUp";
import ResetPassword from "@/components/public-pages/ResetPassword";
import Home from "@/components/auth-pages/Home";

import { Store } from "@/Store";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)!;
  const { userInfo } = state;

  // Function to handle logout
  const handleLogout = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    if (state.hasFilledHealthData) {
      ctxDispatch({ type: "REMOVE_HEALTH_DATA" }); // Removes healthData and the rest below that if it exists
      ctxDispatch({ type: "REMOVE_PROFILE" });
      ctxDispatch({ type: "REMOVE_ROUTINE" });
      ctxDispatch({ type: "REMOVE_CURRENT_TASKS" });
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {userInfo ? (
          <>
            <Route
              path="/home/*"
              element={<Home handleLogout={handleLogout} />}
            />
            <Route path="*" element={<Navigate to="/home/dashboard" />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
