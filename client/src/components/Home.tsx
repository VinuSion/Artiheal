import { Link, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { User, HelpCircle, HeartPulse, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
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

  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString); // We'll get user info as a string from here

  const handleLogoutClick = () => {
    handleLogout(); // handleLogout in App component
    navigate("/"); // navigates to landing page after logging out
  };

  const handleLinkClick = (route: string) => {
    setSelectedLink(route);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className="fixed bottom-0 sm:top-0 w-screen sm:w-20 h-[4.2rem] sm:h-screen sm:shadow-2xl bg-background transition-[width] duration-300 ease-in-out">
        <ul className="list-none p-0 m-0 flex flex-row sm:flex-col justify-center sm:justify-between h-full">
          <li
            className={`${
              selectedLink === "/home/account" ||
              selectedLink === "/home/profile"
                ? "bg-primary text-primary"
                : "bg-background text-foreground hover:bg-slate-100"
            }`}
          >
            <Popover>
              <PopoverTrigger asChild>
                <div className="cursor-pointer flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline">
                  <Avatar className="h-7 w-7 min-w-[1rem] mx-6">
                    <AvatarImage
                      src={`${userInfo.pictureURL}`}
                      alt={`${userInfo.firstName}_profile_picture`}
                    />
                    <AvatarFallback className="font-semibold text-sm">
                      {userInfo.firstName.charAt(0)}
                      {userInfo.lastName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span
                    className={`text-xs sm:hidden ${
                      selectedLink === "/home/account" ||
                      selectedLink === "/home/profile"
                        ? "text-background"
                        : "text-foreground"
                    }`}
                  >
                    Cuenta
                  </span>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-50 p-0">
                <div className="grid">
                  <div
                    className="cursor-pointer px-4 py-2 text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                    onClick={() => handleLinkClick("/home/account")}
                  >
                    <Link
                      to="/home/account"
                      className="flex flex-row items-center"
                    >
                      <User className="h-5 w-8 mr-1" />
                      <span className="text-sm">Mi Cuenta</span>
                    </Link>
                  </div>
                  <div
                    className="cursor-pointer px-4 py-2 text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                    onClick={() => handleLinkClick("/home/profile")}
                  >
                    <Link
                      to="/home/profile"
                      className="flex flex-row items-center"
                    >
                      <HeartPulse className="h-5 w-8 mr-1" />
                      <span className="text-sm">Mi Perfil de Salud</span>
                    </Link>
                  </div>
                  <div
                    className="xs:hidden cursor-pointer px-4 py-2 text-muted-foreground hover:bg-slate-100 hover:text-foreground"
                    onClick={() => handleLinkClick("/home/profile")}
                  >
                    <Link
                      to="/home/help"
                      className="flex flex-row items-center"
                    >
                      <HelpCircle className="h-5 w-8 mr-1" />
                      <span className="text-sm">Ayuda</span>
                    </Link>
                  </div>
                  <Separator />
                  <div
                    className="cursor-pointer rounded-b px-4 py-2 text-muted-foreground hover:bg-destructive hover:text-background"
                    onClick={handleLogoutClick}
                  >
                    <div className="flex flex-row items-center">
                      <LogOut className="h-5 w-8 mr-1" />
                      <span className="text-sm">Cerrar Sesión</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </li>

          <div className="flex flex-row sm:flex-col">
            <li
              className={`${
                selectedLink === "/home/routine"
                  ? "bg-primary text-background"
                  : "bg-background text-foreground hover:bg-slate-100"
              }`}
            >
              <Link
                to="/home/routine"
                onClick={() => handleLinkClick("/home/routine")}
                className="flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline"
              >
                <CalendarDaysIcon className="h-7 w-8 min-w-[1rem] mx-6" />
                <span className="text-xs sm:hidden">Rutina</span>
              </Link>
            </li>

            <li
              className={`${
                selectedLink === "/home/dashboard"
                  ? "bg-primary text-background"
                  : "bg-background text-foreground hover:bg-slate-100"
              }`}
            >
              <Link
                to="/home/dashboard"
                onClick={() => handleLinkClick("/home/dashboard")}
                className="flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline"
              >
                <PresentationChartLineIcon className="h-7 w-8 min-w-[1rem] mx-6" />
                <span className="text-xs sm:hidden">Dashboard</span>
              </Link>
            </li>

            <li
              className={`${
                selectedLink === "/home/points"
                  ? "bg-primary text-background"
                  : "bg-background text-foreground hover:bg-slate-100"
              }`}
            >
              <Link
                to="/home/points"
                onClick={() => handleLinkClick("/home/points")}
                className="flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline"
              >
                <CurrencyDollarIcon className="h-7 w-8 min-w-[1rem] mx-6" />
                <span className="text-xs sm:hidden">Puntos</span>
              </Link>
            </li>
          </div>

          <li
            className={`hidden xs:block ${
              selectedLink === "/home/help"
                ? "bg-primary text-background"
                : "bg-background text-foreground hover:bg-slate-100"
            }`}
          >
            <Link
              to="/home/help"
              onClick={() => handleLinkClick("/home/help")}
              className="flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline"
            >
              <QuestionMarkCircleIcon className="h-7 w-8 min-w-[1rem] mx-6" />
              <span className="text-xs sm:hidden">Ayuda</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* MAIN CONTENT RENDERED DEPENDING ON THE ROUTE YOURE AT */}
      <main className="m-0 sm:ml-20 p-4 bg-slate-100 h-screen">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="routine" element={<Routine />} />
          <Route path="points" element={<Points />} />
          <Route path="help" element={<Help />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<Navigate to="/home/dashboard" />} />
        </Routes>
      </main>
    </>
  );
};

export default Home;
