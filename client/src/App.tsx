import { useState } from 'react';
import {  BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import SignUp from './components/SignUp';
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
            <Route path="/login" Component={Login} />
            <Route path="/signup" Component={SignUp} />
            <Route path="/" Component={LandingPage} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;