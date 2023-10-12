import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./auth/Dashboard";
import Routine from "./auth/Routine";
import Points from "./auth/Points";
import Help from "./auth/Help";
import UserAccount from "./auth/UserAccount";
import UserProfile from "./auth/UserProfile";

interface HomeProps {
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = (
  { handleLogout }: HomeProps
) => {
  const navigate = useNavigate();

  // You can remove this when you're done testing
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  const handleLogoutClick = () => {
    handleLogout(); // handleLogout in App component
    navigate("/"); // navigates to landing page after logging out
  };

  return (
    <div>
      {/* ONLY USE THIS TO TEST THINGS, REMOVE THIS WHEN YOURE DONE */}
      <h1>User ID: {userInfo._id}</h1>
       {/* Navbar */}
       <nav>
        <ul>
        <li>
            <Link to="/home/account">My Account</Link>
          </li>
          <li>
            <Link to="/home/profile">My Profile</Link>
          </li>
          <button onClick={handleLogoutClick}>Logout</button>
          <li>
            <Link to="/home/routine">Routine</Link>
          </li>
          <li>
            <Link to="/home/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/home/points">Points</Link>
          </li>
          <li>
            <Link to="/home/help">Help</Link>
          </li>
          {/* Add more links here for other pages */}
        </ul>
      </nav>
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="routine" element={<Routine />} />
        <Route path="points" element={<Points />} />
        <Route path="help" element={<Help />} />
        <Route path="account" element={<UserAccount />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="*" element={<Navigate to="/home/dashboard" />} />
        {/* Additional authenticated routes */}
      </Routes>
    </div>
  );
};

export default Home;
