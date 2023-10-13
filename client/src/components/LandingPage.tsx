import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";
import { useEffect, useRef } from "react";

const Card: React.FC<{ spanTitle: string; spanMessage: string; cardImage: string; }> = ({
  cardImage,
  spanTitle,
  spanMessage,
}) => (
  <div className="w-72 h-auto bg-gray-100 p-3 rounded-2xl m-5 shadow-2xl">
    <div className="flex items-center justify-center">
      <img src={cardImage} alt={spanTitle} className="h-64 w-64" />
    </div>
    <span className="text-xl font-bold flex justify-center items-center mb-1">{spanTitle}</span>
    <div className="overflow-hidden">
      <p className="text-xs text-justify">{spanMessage}</p>
    </div>
  </div>
);

const LandingPage = () => {
  const cardInfo = [
    {
      cardImage: "src/assets/SVGs/rutinas.svg",
      spanTitle: "Crea rutinas saludables",
      spanMessage: "En Artiheal, te ayudamos a crear rutinas saludables adaptadas a tus necesidades, con enfoque en alimentación, ejercicio, descanso y bienestar emocional. ¡Comienza tu viaje hacia una vida más saludable hoy mismo!",
    },
    {
      cardImage: "src/assets/SVGs/dashboard.svg",
      spanTitle: "Revisa tu progreso",
      spanMessage: "En Artiheal, ofrecemos a nuestros usuarios un completo dashboard estadístico que les permite monitorear y revisar su progreso de manera efectiva en su búsqueda de una vida más saludable.",
    },
    {
      cardImage: "src/assets/SVGs/points.svg",
      spanTitle: "Canjea tus puntos",
      spanMessage: "Artiheal presenta un sistema de puntos que recompensa a los usuarios por su compromiso con un estilo de vida saludable. Al cumplir tus metas, ganas puntos canjeables en tiendas y marcas asociadas.",
    },
  ];


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

  return (
    <>
      <Helmet>
        <title>Bienvenido a Artiheal</title>
      </Helmet>

      <header className="bg-primary p-2 fixed top-0 w-full h-14 sm:h-24 z-10">
        <nav className="flex flex-row items-center justify-around sm:justify-between  ">
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
              <Button variant="outline" className=" text-[10px] sm:text-base ">Registrarse</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-[10px] sm:text-base hidden sm:block ">Iniciar Sesión</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="flex flex-col sm:flex-row p-0 mt-10 sm:mt-20 sm:pt-24  sm:w-9/12 m-4 sm:m-auto">
          <div className="flex flex-col w-full sm:w-1/2 pt-8 sm:pr-8 gap-2 sm:gap-10">
            <h2 className="font-semibold text-2xl sm:text-6xl">Bienvenido a Artiheal</h2>
            <p className="text-base sm:w-76">
            En nuestra plataforma, te ofrecemos un enfoque completo para lograr un estilo de vida más saludable y equilibrado.
            Explora cómo podemos ayudarte a alcanzar tus metas de bienestar y vivir de manera más saludable.
            ¡Únete a nuestra comunidad y comienza tu viaje hacia una vida mejor con Artiheal!
            </p>
            <Link to="/signup" className="w-28">
              <Button variant="landing" className="mb-6 sm:m-0">Comenzar</Button>
            </Link>
          </div>

          <div className="w-full sm:w-1/2 flex justify-center">
            <img
              className="object-contain max-w-full h-auto"
              src="src/assets/legend.webp"
              alt="legend"
            />
          </div>
        </section>


        <section id="services" className=" p-10  sm:py-20">
          <h2 className="text-5xl text-primary font-semibold text-center mt-6">
            Nuestros servicios
          </h2>
          <div className=" justify-evenly flex-wrap sm:flex">
            {cardInfo.map((info, index) => (
              <Card
                key={index}
                spanTitle={info.spanTitle}
                spanMessage={info.spanMessage}
                cardImage={info.cardImage}
              />
            ))}
          </div>
        </section>

        <section id="product" className="pb-8">
          <h2 className="text-5xl text-primary font-semibold text-center">
            Canjea tus puntos con nuestras marcas aliadas
          </h2>
          <LogoSlider />
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
                  123 Main Street Anytown, Postal Code: 12345
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
            <span className="mb-4">
              Copyright © 2023 Artiheal. Todos los derechos.
            </span>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
