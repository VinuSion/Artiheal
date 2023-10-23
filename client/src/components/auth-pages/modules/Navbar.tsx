import { useContext, useEffect, useState } from "react";
import { Store } from "@/Store";
import { Link, useNavigate } from "react-router-dom";
import {
  CalendarDaysIcon,
  PresentationChartLineIcon,
  CurrencyDollarIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { User, HelpCircle, HeartPulse, LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Separator } from "@ui/separator";

type NavbarProps = {
  handleLogout: () => void;
};

const Navbar = ({ handleLogout }: NavbarProps) => {
  const { state } = useContext(Store)!;
  const [userInfo] = useState(state.userInfo);
  const navigate = useNavigate();

  const currentPath = window.location.pathname;
  const [selectedLink, setSelectedLink] = useState(currentPath);
  const [isXsScreen, setIsXsScreen] = useState(window.innerWidth <= 400);

  const conditionalClassnames = `${
    selectedLink === "/home/account" ||
    selectedLink === "/home/profile" ||
    (isXsScreen && selectedLink === "/home/help")
      ? "bg-primary text-primary"
      : "bg-background text-foreground hover:bg-slate-100"
  }`;

  useEffect(() => {
    // Update isXsScreen whenever the window is resized
    const handleResize = () => {
      setIsXsScreen(window.innerWidth <= 400);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isXsScreen]);

  const handleLogoutClick = () => {
    handleLogout(); // Passes handleLogout to Home component then to App component
    navigate("/"); // navigates to landing page after logging out
  };

  const handleLinkClick = (route: string) => {
    setSelectedLink(route);
  };

  return (
    <nav className="fixed bottom-0 sm:top-0 w-screen sm:w-20 h-[4.2rem] sm:h-screen sm:shadow-2xl bg-background transition-[width] duration-300 ease-in-out">
      <ul className="list-none p-0 m-0 flex flex-row sm:flex-col justify-center sm:justify-between h-full">
        <li className={conditionalClassnames}>
          <Popover>
            <PopoverTrigger asChild>
              <div className="cursor-pointer flex flex-col justify-center items-center h-[4.2rem] sm:h-20 no-underline">
                <Avatar className="border-2 h-7 w-7 min-w-[1rem] mx-6">
                  <AvatarImage
                    src={`${userInfo?.pictureURL}`}
                    alt={`${userInfo?.firstName}_profile_picture`}
                  />
                  <AvatarFallback className="font-semibold text-xs">
                    {userInfo?.firstName.charAt(0)}
                    {userInfo?.lastName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={`text-xs sm:hidden ${
                    selectedLink === "/home/account" ||
                    selectedLink === "/home/profile" ||
                    (isXsScreen && selectedLink === "/home/help")
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
                  onClick={() => handleLinkClick("/home/help")}
                >
                  <Link to="/home/help" className="flex flex-row items-center">
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
  );
};

export default Navbar;