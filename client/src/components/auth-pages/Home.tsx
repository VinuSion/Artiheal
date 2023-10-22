import { useEffect, useState, useRef } from "react";
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

interface HomeProps {
  handleLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ handleLogout }: HomeProps) => {
  const userInfoString = localStorage.getItem('userInfo')!;
  const userInfo = JSON.parse(userInfoString);
  const [isHPFormOpen, setIsHPFormOpen] = useState(false);
  const isMounted = useRef(false);

  const checkHealthProfile = async () => {
    try {
      const healthProfile = await Axios.get(
        `/api/health-profile/${userInfo._id}`
      );
      console.log("Se encontro el perfil de salud: ", healthProfile.data);
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 404) {
          console.error("El perfil de salud no se pudo encontrar. (Llena el Formulario)");
          setIsHPFormOpen(true); // Health profile not found, show health profile form popup.
        } else if (err.response.status === 500) {
          console.error("Error al encontrar el perfil de salud (Server is offline)");
        }
      } else {
        console.error("Error al encontrar el perfil de salud: ", err);
      }
    }
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      checkHealthProfile();
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
