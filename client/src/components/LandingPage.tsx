import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef } from "react";

const Card: React.FC<{ spanMessage: string; buttonMessage: string }> = ({
  spanMessage,
  buttonMessage,
}) => (
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

const LogoSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cloneElements = () => {
      const slider = sliderRef.current;
      if (slider) {
        const originalContent = slider.innerHTML;
        slider.innerHTML = originalContent + originalContent;
      }
    };
    cloneElements();
  }, []);

  const logos = [
    "adidas.svg",
    "exito.svg",
    "funko.svg",
    "mcdonalds.svg",
    "microsoft.svg",
    "kfc.svg",
    "crepes.svg",
    "nintendo.svg",
    "apple.svg",
  ];

  return (
    <div className="overflow-hidden py-14">
      <div ref={sliderRef} className="flex whitespace-nowrap animate-slide">
        {logos.map((logo, index) => (
          <img
            key={index}
            src={`src/assets/SVGs/${logo}`}
            className="h-10 mx-5 sm:h-20 sm:mx-10"
            alt={logo}
          />
        ))}
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
    <>
      <Helmet>
        <title>Bienvenido a Artiheal</title>
      </Helmet>

      <header className="bg-primary p-2 fixed top-0 w-full h-14 sm:h-24 ">
        <nav className="flex flex-row justify-between  items-center ">
          <div className="flex flex-row items-center text-white">
            <img className="h-10 w-10 sm:w-20 sm:h-20" src="/artiheal-logo.svg" alt="logo" />
            <div className="flex flex-col">
              <h1 className="font-bold text-base sm:text-2xl">Artiheal</h1>
              <span className="text-xs sm:text-lg">Cambiando Vidas</span>
            </div>
          </div>
          <div>
            <ul className="flex-row gap-6  hidden sm:flex">
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#home">Inicio</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#services">Servicios</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#product">Producto</a>
              </li>
              <li className="text-white hover:scale-105 transform transition-transform duration-300">
                <a href="#">Sobre nosotros</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-row space-x-4 mr-4">
            <Link to="/signup">
              <Button variant="outline" className=" text-[10px] sm:text-base">Registrarse</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-[10px] sm:text-base">Iniciar Sesión</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="flex flex-col sm:flex-row p-0 mt-10 sm:mt-20 sm:pt-40  w-full sm:w-9/12 m-4 sm:m-auto">
          <div className="flex  flex-col w-1/2  pt-8 mr-8 gap-2 sm:gap-10">
            <h2 className=" font-semibold text-2xl sm:text-6xl">Bienvenido a Artiheal</h2>
            <p className="w-80 text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
              dolorum ad repellat quasi saepe. Iure sunt fugit, inventore
              perferendis cupiditate a voluptas rerum distinctio nostrum dolor
              magnam sequi, ducimus voluptatu.
            </p>
            <Link to="/signup" className="w-28">
              <Button variant="landing" className="mb-6 sm:m-0">Comenzar</Button>
            </Link>
          </div>

          <div>
            <img
              className="object-contain w-[500px] sm:w-11/12"
              src="src/assets/legend.webp"
              alt="legend"
            />
          </div>
        </section>

        <section id="services" className=" p-10  sm:py-48">
          <h2 className="text-5xl text-primary font-semibold text-center pb-10">
            Nuestros servicios
          </h2>
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

        <section id="product" className="pb-8">
          <h2 className="text-5xl text-primary font-semibold text-center">
            Canjea tus puntos con nuestras marcas aliadas
          </h2>
         {/* <LogoSlider />*/}
        </section>

        <footer className="bg-primary text-white flex flex-col">
          <div className="container mx-auto py-8 w-1/2">
            <div className="flex row place-items-center justify-start py-10">
              <img className="h-20 w-20" src="/artiheal-logo.svg" alt="logo" />
              <span className="text-xl">Artiheal</span>
            </div>
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <p className="mb-4">Contactanos</p>
                <p className="mb-4">
                  123 Main Street Anytown, USA Postal Code: 12345
                </p>
                <p className="mb-4">Llamanos: 123-456-678</p>
              </div>
              <div className="flex-shrink">
                <ul className="list-reset">
                  <li>
                    <a href="#">Company</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Social Media</a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="mb-4">Redes Sociales</p>
                <ul className="list-reset">
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                  <li>
                    <a href="#">Instagram</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <p className="mb-4">
              Copyright © 2023 Artiheal. Todos los derechos.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
