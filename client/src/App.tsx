import { useState } from 'react';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <Route path="/" Component={HomePage} />
        ) : (
          <>
            <Route path="/login" Component={LoginPage} />
            <Route path="/register" Component={RegisterPage} />
            <Route path="/" Component={LandingPage} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;