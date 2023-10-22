import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@ui/button";
import {
  LogoSlider,
  Card,
  CardOp,
  cardInfo,
  Footer,
} from "./modules/LandingSections";
import { cardOpInfo } from "@/lib/constants";

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Bienvenido a Artiheal</title>
      </Helmet>

      <header className="bg-primary p-2 fixed top-0 w-full h-16 sm:h-24 z-10">
        <nav className="flex flex-row items-center justify-between mt-1 sm:mt-0">
          <div className="flex flex-row items-center text-background">
            <img
              className="h-10 w-10 sm:w-20 sm:h-20"
              src="/artiheal-logo.svg"
              alt="logo"
            />
            <div className="flex flex-col">
              <h1 className="font-bold text-base sm:text-2xl">Artiheal</h1>
              <span className="text-xs sm:text-lg">Cambiando Vidas</span>
            </div>
          </div>
          <div>
            <ul className="flex-row gap-6 hidden lg:flex">
              <li className="text-background">
                <a href="#">Inicio</a>
              </li>
              <li className="text-background">
                <a href="#services">Servicios</a>
              </li>
              <li className="text-background">
                <a href="#patrocinadores">Clientes</a>
              </li>
              <li className="text-background">
                <a href="#about">Sobre nosotros</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-row space-x-4 sm:mr-4">
            <Link to="/signup">
              <Button variant="outline" className="text-xs sm:text-base">
                Registrarse
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                className="text-xs sm:text-base hidden sm:block"
              >
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      <main className="pt-10 sm:pt-20 space-y-10 sm:space-y-5">
        <section className="flex flex-col px-10 sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-3 sm:m-auto">
          <div className="flex flex-col w-full mt-5 sm:mt-0 sm:w-1/2 pt-8 sm:mr-8 gap-2 sm:gap-5">
            <h4 className="font-semibold text-primary text-base">
              Bienvenido a Artiheal
            </h4>
            <h2 className="font-bold text-4xl sm:text-6xl">
              Donde tu salud se convierte en{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-purple-400 to-violet-300">
                arte
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground sm:w-76 sm:pr-8">
              En nuestra plataforma, te ofrecemos un enfoque completo para
              lograr un estilo de vida más saludable y equilibrado. Explora cómo
              podemos ayudarte a alcanzar tus metas de bienestar y vivir de
              manera más saludable. ¡Únete a nuestra comunidad y comienza tu
              viaje hacia una vida mejor con Artiheal!
            </p>
            <Link to="/signup">
              <Button variant="special" className="my-5 sm:my-0">
                Comenzar
              </Button>
            </Link>
          </div>

          <div className="w-full sm:w-2/4 flex items-center justify-center">
            <img src="src/assets/legend.webp" alt="legend_image" />
          </div>
        </section>

        <section className="flex flex-col sm:flex-row-reverse px-10 sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-3 sm:m-auto">
          <div className="flex flex-col w-full sm:mt-0 sm:w-1/2 sm:ml-10 gap-2 sm:gap-5">
            <h4 className="font-semibold text-primary text-base">
              Pon tu salud primero
            </h4>
            <h2 className="font-bold text-4xl sm:text-6xl">
              Descubre un estilo de vida más{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 via-purple-500 to-violet-200">
                saludable
              </span>
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground sm:w-76 sm:pr-8">
              Desde consejos personalizados hasta seguimiento de progreso,
              Artiheal tiene todo lo que necesitas para lograr un estilo de vida
              más saludable. ¡Inspírate, apóyate y celebra tus logros con
              Artiheal!{" "}
              <span className="text-primary">
                (Aplican términos y condiciones)
              </span>
            </p>
          </div>

          <div className="w-full sm:w-2/4 flex items-center justify-center">
            <img src="src/assets/section-2.webp" alt="legend_image" />
          </div>
        </section>

        <section
          id="services"
          className="sm:pt-10 mx-5 flex flex-col justify-center items-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold px-3 text-center mt-6 text-primary">
            Servicios que ofrecemos
          </h2>
          <div className="justify-evenly flex-wrap sm:flex sm:mt-5 sm:gap-x-24">
            {cardInfo.map((info, index) => (
              <Card
                key={index}
                spanTitle={info.spanTitle}
                icon={info.icon}
                spanMessage={info.spanMessage}
                cardImage={info.cardImage}
              />
            ))}
          </div>
        </section>

        <section id="patrocinadores" className="sm:pt-10">
          <h2 className="text-4xl sm:text-5xl font-bold px-5 text-center mt-6 text-primary">
            Nuestras marcas aliadas
          </h2>
          <LogoSlider />
        </section>

        <section
          id="opinions"
          className="sm:pt-10 pb-10 mx-5 flex flex-col justify-center items-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold px-2 text-center mt-6 text-primary">
            Opiniones de nuestros usuarios
          </h2>
          <div className="justify-evenly flex-wrap sm:flex sm:mt-5 sm:gap-x-24">
            {cardOpInfo.map((Opinfo, index) => (
              <CardOp
                key={index}
                spanName={Opinfo.spanName}
                spanOpinion={Opinfo.spanOpinion}
                opinionImage={Opinfo.opinionImage}
              />
            ))}
          </div>
        </section>

        <Footer />
        
      </main>
    </>
  );
};

export default LandingPage;
