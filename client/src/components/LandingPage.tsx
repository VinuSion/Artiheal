import { useEffect, useRef, useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Helmet } from "react-helmet-async";
import { Receipt, ActivitySquare, CalendarHeart } from "lucide-react";

const Card: React.FC<{
  spanTitle: string;
  spanMessage: string;
  icon: ReactNode;
  cardImage: string;
}> = ({ cardImage, spanTitle, spanMessage, icon }) => (
  <div className="p-[2px] my-10 sm:mx-10 rounded-2xl bg-gradient-to-tr from-violet-400 via-background to-violet-400">
    <div className="w-72 h-auto bg-slate-50 p-5 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-center">
        <img src={cardImage} alt={spanTitle} className="h-64 w-64" />
      </div>
      <span className="text-xl font-bold flex items-center mb-1">
        {icon}
        {spanTitle}
      </span>
      <div className="overflow-hidden">
        <p className="text-xs sm:text-sm text-muted-foreground text-justify">
          {spanMessage}
        </p>
      </div>
    </div>
  </div>
);

const CardOp: React.FC<{
  spanName: string;
  spanOpinion: string;
  opinionImage: string;
}> = ({ opinionImage, spanName, spanOpinion }) => (
  <div className="p-[2px] my-10 sm:mx-10 rounded-2xl bg-gradient-to-tr from-violet-400 via-background to-violet-400">
    <div className="w-72 h-auto bg-slate-50 p-3 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-center">
        <div className="p-1 bg-gradient-to-b from-primary to-purple-400 rounded-full">
          <img
            src={opinionImage}
            alt={spanName}
            className="object-cover h-16 w-16 rounded-full"
          />
        </div>
      </div>
      <span className="text-xl font-bold flex justify-center items-center mt-1">
        {spanName}
      </span>
      <div className="text-primary text-xl tracking-[2px] flex items-center justify-center">
        ★★★★★
      </div>
      <div className="overflow-hidden p-2">
        <p className="italic text-sm text-muted-foreground text-justify">
          {spanOpinion}
        </p>
      </div>
    </div>
  </div>
);

const LandingPage = () => {
  const [isXsScreen] = useState(window.innerWidth <= 400);

  const cardInfo = [
    {
      cardImage: "src/assets/SVGs/rutinas.svg",
      spanTitle: "Rutinas a tu ritmo",
      icon: <CalendarHeart className="h-5 w-5 mr-2" />,
      spanMessage:
        "En Artiheal, te ayudamos a crear rutinas saludables adaptadas a tus necesidades, con enfoque único y diverso. ¡Comienza tu viaje hacia una vida más saludable hoy mismo!",
    },
    {
      cardImage: "src/assets/SVGs/dashboard.svg",
      spanTitle: "Revisa tu progreso",
      icon: <ActivitySquare className="h-5 w-5 mr-2" />,
      spanMessage:
        "Ofrecemos a nuestros usuarios un dashboard estadístico que les permite monitorear y revisar su progreso de manera efectiva en su búsqueda de una vida más saludable.",
    },
    {
      cardImage: "src/assets/SVGs/points.svg",
      spanTitle: "Redime tus puntos",
      icon: <Receipt className="h-5 w-5 mr-2" />,
      spanMessage:
        "Contamos con un sistema de puntos que recompensa a los usuarios por su compromiso. Al cumplir tus metas, ganas puntos canjeables en tiendas y marcas asociadas.",
    },
  ];

  const cardOpInfo = [
    {
      opinionImage: "src/assets/UsersImgs/user1.jpg",
      spanName: "Verónica Gil",
      spanOpinion:
        '"Artiheal es genial. Ha marcado la diferencia en mi salud. ¡Una herramienta increible!"',
    },
    {
      opinionImage: "src/assets/UsersImgs/user2.webp",
      spanName: "Andrés Martínez",
      spanOpinion:
        '"No puedo dejar de usar Artiheal. ¡Me encanta ganar puntos redimibles mientras me cuido!"',
    },
    {
      opinionImage: "src/assets/UsersImgs/user3.jpg",
      spanName: "Salvio Peña",
      spanOpinion:
        '"Me encanta Artiheal. Hace que la vida saludable sea más fácil. Cinco estrellas merecidas."',
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
                <a href="#product">Producto</a>
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
        <section
          className="flex flex-col px-10 sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-3 sm:m-auto"
        >
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

        <section className="flex flex-col px-10 sm:flex-row sm:pt-24 sm:w-9/12 m-2 gap-3 sm:space-x-3 sm:m-auto">
          {isXsScreen ? (
            <>
              <div className="flex flex-col w-full sm:mt-0 sm:w-1/2 sm:mr-8 gap-2 sm:gap-5">
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
                  Artiheal tiene todo lo que necesitas para lograr un estilo de
                  vida más saludable. ¡Inspírate, apóyate y celebra tus logros
                  con Artiheal!{" "}
                  <span className="text-primary">
                    (Aplican terminos y condiciones)
                  </span>
                </p>
              </div>

              <div className="w-full sm:w-2/4 flex items-center justify-center">
                <img src="src/assets/legend.webp" alt="legend_image" />
              </div>
            </>
          ) : (
            <>
              <div className="w-full sm:w-2/4 flex items-center justify-center">
                <img src="src/assets/legend.webp" alt="legend_image" />
              </div>

              <div className="flex flex-col w-full sm:mt-0 sm:w-1/2 sm:mr-8 gap-2 sm:gap-5">
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
                  Artiheal tiene todo lo que necesitas para lograr un estilo de
                  vida más saludable. ¡Inspírate, apóyate y celebra tus logros
                  con Artiheal!{" "}
                  <span className="text-primary">
                    (Aplican terminos y condiciones)
                  </span>
                </p>
              </div>
            </>
          )}
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

        <section id="product" className="sm:pt-10">
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

        <footer id="about" className="bg-primary">
          <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div>
                <div className="text-background flex flex-row items-center">
                  <img
                    className="h-20 w-20"
                    src="/artiheal-logo.svg"
                    alt="logo"
                  />
                  <span className="text-5xl font-bold">Artiheal</span>
                </div>

                <p className="mt-4 max-w-xs text-background">
                  Este proyecto no tiene afiliaciones reales con las marcas
                  mencionadas. Todo el contenido en esta pagina es meramente
                  ilustrativo.
                </p>

                <ul className="mt-8 flex gap-6">
                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      className="text-background transition hover:opacity-75"
                    >
                      <span className="sr-only">Facebook</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      className="text-background transition hover:opacity-75"
                    >
                      <span className="sr-only">Instagram</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      className="text-background transition hover:opacity-75"
                    >
                      <span className="sr-only">Twitter</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      className="text-background transition hover:opacity-75"
                    >
                      <span className="sr-only">GitHub</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      rel="noreferrer"
                      className="text-background transition hover:opacity-75"
                    >
                      <span className="sr-only">Dribbble</span>

                      <svg
                        className="h-6 w-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
                <div>
                  <p className="font-medium text-background">La Empresa</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Acerca de Nosotros
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Conoce nuestro equipo
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Gestion de Cuentas
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-background">Recursos</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Contacto
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        FAQs
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Asistente de Chat
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <p className="font-medium text-background">Marco Legal</p>

                  <ul className="mt-6 space-y-4 text-sm">
                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Accesibilidad
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Terminos y Condiciones
                      </a>
                    </li>

                    <li>
                      <a
                        href="#"
                        className="text-background transition opacity-80 hover:opacity-100"
                      >
                        Politica de Privacidad
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-xs text-background">
              &copy; 2023 - Artiheal | Todos los derechos reservados
            </p>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
