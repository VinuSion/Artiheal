import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";

const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome to Artiheal</title>
      </Helmet>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-primary py-4 flex flex-row justify-between h-28 items-center p-2">
          <div className="flex flex-row items-center text-white">
            <img className="h-20 w-20" src="/artiheal-logo.svg" alt="logo" />
            <div className="ml-4 flex flex-col">
              <h1 className="text-4xl font-bold">Artiheal</h1>
              <span className="text-lg">Cambiando Vidas</span>
            </div>
          </div>

          <div className="flex flex-row space-x-4 mr-4">
            <Link to="/signup">
              <Button variant="outline">Registrarse</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
          </div>
        </header>
      </div>
    </div>
  );
};

export default LandingPage;
