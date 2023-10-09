import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";
import { cards } from "./ui/cards";


const LandingPage = () => {
  return (
    <div>
      <Helmet>
        <title>Welcome to Artiheal</title>
      </Helmet>

      <div className="bg-[url('src/assets/bg-land1.jpg')] bg-cover bg-no-repeat bg-center min-h-screen">
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

        <div className="flex mb-2" >
          <div className="w-1/2 m-24 p-3">
            <h1 className="text-6xl font-bold leading-tight flex justify-center">Lorem ipsum dolor sit amet.</h1>
            <p className="mt-4 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et culpa adipisci
              perferendis ut qui molestias perspiciatis a vel debitis, sed ducimus quasi
              sint,soluta voluptates mollitia cupiditate placeat? Consequuntur, quae?
            </p>
            <Button variant="landing">Más información</Button>
          </div>
          
          <div className="w-1/2 mt-16 flex justify-center">
            <img src="/src/assets/land11.png" className="w-80 h-80"></img>
          </div>
        </div>

        <h2 className="text-4xl font-bold text-center">Nuestros servicios</h2>

        <div className="flex justify-around">
          
        </div>

      </div>
    </div>
  );
};

export default LandingPage;
