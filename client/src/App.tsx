import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DashboardPage from "./components/DashboardPage";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const localStorageIsAuth = localStorage.getItem("isAuth");
    if (localStorageIsAuth) {
      setIsAuth(localStorageIsAuth === "true");
    }
  }, []);

  // Function to handle login
  const handleLogin = () => {
    // Perform authentication logic
    // ...

    // Set isAuth to true and update localStorage
    setIsAuth(true);
    localStorage.setItem("isAuth", "true");
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic
    // ...

    // Set isAuth to false and update localStorage
    setIsAuth(false);
    localStorage.setItem("isAuth", "false");
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuth ? (
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
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path="/signup"
              element={<SignUp handleLogin={handleLogin} />}
            />
            <Route path="/" element={<LandingPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
