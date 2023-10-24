import { useContext, useEffect, useState, useRef } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Routine from "./Routine";
import Points from "./Points";
import Help from "./Help";
import UserAccount from "./UserAccount";
import UserProfile from "./UserProfile";
import Navbar from "./modules/Navbar";
import HPForm from "./modules/HPForm";
import Axios from "axios";
import { Store } from "@/Store";

interface HomeProps {
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout }: HomeProps) => {
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);
  // Check if healthData and profile is already in localStorage
  const storedHealthData = localStorage.getItem("healthData");
  const storedProfile = localStorage.getItem("profile");
  const { dispatch: ctxDispatch } = useContext(Store)!;

  const [isHPFormOpen, setIsHPFormOpen] = useState(false);
  const isMounted = useRef(false);

  const checkHealthData = async () => {
    try {
      const healthDataResponse = await Axios.get(
        `/api/health-data/${userInfo._id}`
      );
      const healthData = healthDataResponse.data;
      if (healthData) {
        ctxDispatch({ type: "CREATE_HEALTH_DATA", payload: healthData });
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 404) {
          console.error(
            "Los datos de salud no se pudieron encontrar. (Llena el Formulario)"
          );
          setIsHPFormOpen(true); // Health profile not found, show health profile form popup.
        } else if (err.response.status === 500) {
          console.error(
            "Error al encontrar los datos de salud (Servidor offline)"
          );
        }
      } else {
        console.error(err);
      }
    }
  };

  const checkProfile = async () => {
    try {
      const healthProfileResponse = await Axios.get(
        `/api/profile/${userInfo._id}`
      );
      const userProfile = healthProfileResponse.data;
      if (userProfile) {
        ctxDispatch({ type: "CREATE_PROFILE", payload: userProfile });
      }
    } catch (err: any) {
      console.error("El perfil de salud no se pudo encontrar (No has llenado ese formulario todavia)");
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (!storedHealthData) {
        checkHealthData(); // If healthData is not in localStorage, make the request
      }
      if (!storedProfile) {
        checkProfile(); // If profile is not in localStorage, make the request
      }
    }
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <Navbar handleLogout={handleLogout} />

      {/* MAIN CONTENT RENDERED DEPENDING ON THE ROUTE YOURE AT */}
      <main className="m-0 mb-10 sm:mb-0 sm:ml-20 p-4 bg-slate-100 h-[100vh] overflow-y-auto">
        <HPForm open={isHPFormOpen} onClose={() => setIsHPFormOpen(false)} />
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
