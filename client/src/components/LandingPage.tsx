import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";

interface CardProps {
  spanMessage: string;
  buttonMessage: string;
}

const Card: React.FC<CardProps> = ({ spanMessage, buttonMessage }) => {
  return (
    <div className="w-60 h-80 bg-gray-50 p-3 flex flex-col gap-1 rounded-2xl m-5 shadow-2xl mb-32">
      <div className="h-48 bg-gray-700 rounded-xl"></div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold">{spanMessage}</span>
          </div>
        </div>
        <Button variant="landing">{buttonMessage}</Button>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const cardInfo = [
    {
      spanMessage: "Servicio 1",
      buttonMessage: "Más información 1",
    },
    {
      spanMessage: "Servicio 2",
      buttonMessage: "Más información 2",
    },
    {
      spanMessage: "Servicio 3",
      buttonMessage: "Más información 3",
    },
  ];

  return (
    <div>
      <Helmet>
        <title>Welcome to Artiheal</title>
      </Helmet>

      <div className="">
        <header className="bg-primary py-4 flex flex-row justify-between h-28 items-center p-2 ">
          <div className="flex flex-row items-center text-white">
            <img className="h-20 w-20" src="/artiheal-logo.svg" alt="logo" />
            <div className="ml-4 flex flex-col">
              <h1 className="text-4xl font-bold">Artiheal</h1>
              <span className="text-lg">Cambiando Vidas</span>
            </div>
          </div>
          <nav>
            <ul className="flex flex-row gap-6">
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#">Inicio</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#">Producto</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#">Servicios</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#">Sobre nosotros</a>
              </li>
            </ul>
          </nav>

          <div className="flex flex-row space-x-4 mr-4">
            <Link to="/signup">
              <Button variant="outline">Registrarse</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
          </div>
        </header>

        <main className="flex flex-col items-center justify-center  ">
          <section className="flex my-10  place-items-center px-16">
            <div className="w-1/2">
              <h2 className="text-6xl font-bold leading-tight text-start">
                Lorem ipsum dolor sit amet.
              </h2>
              <p className="my-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
                culpa adipisci perferendis ut qui molestias perspiciatis a vel
                debitis, sed ducimus quasi sint, soluta voluptates mollitia
                cupiditate placeat? Consequuntur, quae?
              </p>
              <Button variant="landing">Más información</Button>
            </div>

            <div className="w-1/2 flex justify-center">
              <img
                src="/src/assets/land11.png"
                className="h-80 w-80 object-contain"
              />
            </div>
          </section>

          <section className="my-16 bg-indigo-500 w-full">
            <h2 className="text-4xl font-bold text-center mt-8">Servicios</h2>

            <div className="flex justify-evenly">
              {cardInfo.map((info, index) => (
                <Card
                  key={index}
                  spanMessage={info.spanMessage}
                  buttonMessage={info.buttonMessage}
                />
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
