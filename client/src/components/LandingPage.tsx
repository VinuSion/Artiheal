import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const LandingPage = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-indigo-500 py-4 flex flex-row items-center	p-2">
          <img
            className="h-20, w-20"
            src="../artiheal-logo.svg"
            alt="logo"
          />
          <div className="container mx-auto text-white text-center">
            <h1 className="text-4xl font-bold">Welcome to Artiheal</h1>
            <p className="mt-2 text-lg"></p>
          </div>
          <Button><Link to="/login">Iniciar Sesión</Link></Button>
          <Button><Link to="/SignUp">Registrar</Link></Button>


        </header>
      </div>
    </div>
  );
};

export default LandingPage;
