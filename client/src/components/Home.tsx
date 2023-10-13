import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  UserCircleIcon,
  CalendarDaysIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import Dashboard from "./auth/Dashboard";
import Routine from "./auth/Routine";
import Points from "./auth/Points";
import Help from "./auth/Help";
import UserAccount from "./auth/UserAccount";
import UserProfile from "./auth/UserProfile";
import { useState } from "react";

interface HomeProps {
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout }: HomeProps) => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState("/home/dashboard");

  // You can remove this when you're done testing
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  const handleLogoutClick = () => {
    handleLogout(); // handleLogout in App component
    navigate("/"); // navigates to landing page after logging out
  };

  const handleLinkClick = (route: string) => {
    setSelectedLink(route);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="fixed bottom-0 sm:top-0 w-screen sm:w-20 h-[4.2rem] sm:h-screen sm:shadow-2xl bg-background transition-[width] duration-300 ease-in-out">
        <ul className="list-none p-0 m-0 flex flex-row sm:flex-col justify-center sm:justify-between h-full">
          <div>
            <li
              className={`${
                selectedLink === "/home/account"
                  ? "bg-primary"
                  : "bg-background"
              }`}
            >
              <Link
                to="/home/account"
                onClick={() => handleLinkClick("/home/account")}
                className={`flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline ${
                  selectedLink === "/home/account"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                <UserCircleIcon
                  className={`h-7 w-8 min-w-[1rem] mx-6 ${
                    selectedLink === "/home/account"
                      ? "text-background"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs sm:hidden">Cuenta</span>
              </Link>
            </li>
          </div>

          <div className="flex flex-row sm:flex-col">
            <li className={`${
                selectedLink === "/home/routine"
                  ? "bg-primary"
                  : "bg-background"
              }`}>
              <Link
                to="/home/routine"
                onClick={() => handleLinkClick("/home/routine")}
                className={`flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline ${
                  selectedLink === "/home/routine"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                <CalendarDaysIcon
                  className={`h-7 w-8 min-w-[1rem] mx-6 ${
                    selectedLink === "/home/routine"
                      ? "text-background"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs sm:hidden">Rutina</span>
              </Link>
            </li>

            <li className={`${
                selectedLink === "/home/dashboard"
                  ? "bg-primary"
                  : "bg-background"
              }`}>
              <Link
                to="/home/dashboard"
                onClick={() => handleLinkClick("/home/dashboard")}
                className={`flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline ${
                  selectedLink === "/home/dashboard"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                <PresentationChartLineIcon
                  className={`h-7 w-8 min-w-[1rem] mx-6 ${
                    selectedLink === "/home/dashboard"
                      ? "text-background"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs sm:hidden">Dashboard</span>
              </Link>
            </li>

            <li className={`${
                selectedLink === "/home/points"
                  ? "bg-primary"
                  : "bg-background"
              }`}>
              <Link
                to="/home/points"
                onClick={() => handleLinkClick("/home/points")}
                className={`flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline ${
                  selectedLink === "/home/points"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                <CurrencyDollarIcon
                  className={`h-7 w-8 min-w-[1rem] mx-6 ${
                    selectedLink === "/home/points"
                      ? "text-background"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs sm:hidden">Puntos</span>
              </Link>
            </li>
          </div>

          <div className="hidden xs:block">
            <li className={`${
                selectedLink === "/home/help"
                  ? "bg-primary"
                  : "bg-background"
              }`}>
              <Link
                to="/home/help"
                onClick={() => handleLinkClick("/home/help")}
                className={`flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline ${
                  selectedLink === "/home/help"
                    ? "text-background"
                    : "text-foreground"
                }`}
              >
                <QuestionMarkCircleIcon
                  className={`h-7 w-8 min-w-[1rem] mx-6 ${
                    selectedLink === "/home/help"
                      ? "text-background"
                      : "text-foreground"
                  }`}
                />
                <span className="text-xs sm:hidden">Ayuda</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
      {/* MAIN CONTENT RENDERED DEPENDING ON THE ROUTE YOURE AT */}
      <main className="m-0 sm:ml-20 p-4 bg-slate-100 h-screen">
        {/* ONLY USE THIS TO TEST THINGS, REMOVE THIS WHEN YOURE DONE */}
        <h1>User ID: {userInfo._id}</h1>
        <button onClick={handleLogoutClick}>Logout</button>
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
      </main>
    </>
  );
};

export default Home;
