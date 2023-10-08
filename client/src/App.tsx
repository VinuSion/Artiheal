import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashboardPage from "./components/DashboardPage";

import { Store } from './Store';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store)!;
  const { userInfo } = state;

  // Function to handle logout
  const handleLogout = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
  };

  return (
    <BrowserRouter>
      <Routes>
        {userInfo ? (
          <>
            <Route path="*" element={<Navigate to="/dashboard" />} />
            <Route
              path="/dashboard"
              element={<DashboardPage handleLogout={handleLogout} />}
            />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/" />} />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route path="/" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
