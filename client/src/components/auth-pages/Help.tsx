import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { UserCircle2, CalendarDays, Gem } from "lucide-react";

const Help = () => {
  return (
    <>
      <Helmet>
        <title>Ayuda | Preguntas Frecuentes</title>
      </Helmet>
      <section className="flex flex-row justify-center mb-6">
        <article className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl">
          <Accordion type="single" collapsible className="w-full">
            <div className="rounded-xl bg-background w-full p-4 flex flex-col items-center">
              <div className="text-left sm:w-9/12 mb-7">
                <div className="flex flex-row items-center">
                  <img
                    className="h-[35px] w-[35px] select-none mr-1"
                    src="/artiheal-logo-purple.svg"
                    alt="logo"
                  />
                  <h2 className="font-bold text-2xl sm:text-4xl py-4 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 via-purple-500 to-violet-200">
                    Soporte Artiheal
                  </h2>
                </div>
                <span className="text-sm sm:text-base">
                  <strong>¿Necesitas ayuda?</strong> Revisa nuestro FAQ o
                  contactanos.
                </span>
                <span className="block pt-2 text-muted-foreground text-sm sm:text-base">
                  Obtén las respuestas a las preguntas más frecuentes sobre
                  Artiheal.
                </span>
              </div>

              <div className="border border-s p-6 rounded-md sm:w-9/12 mb-6">
                <div className="flex flex-row items-center">
                  <UserCircle2 className="h-6 w-6 text-primary select-none mr-1" />
                  <h3 className="text-2xl font-bold text-primary">
                    Cuenta/Perfil
                  </h3>
                </div>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    ¿Cómo puedo cambiar la información de mi perfil?
                  </AccordionTrigger>
                  <AccordionContent>
                    Para actualizar la información de tu perfil, inicia sesión
                    en tu cuenta de Artiheal y ve a la sección de configuración.
                    Desde allí, podrás modificar los detalles de tu perfil, como
                    la foto, la dirección de correo electrónico y otros datos
                    personales.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    ¿Cómo puedo recuperar mi contraseña si la olvidé?
                  </AccordionTrigger>
                  <AccordionContent>
                    Si olvidaste tu contraseña, puedes utilizar la opción
                    "¿Olvidaste la contraseña?" en la página de inicio de sesión
                    de Artiheal para restablecerla. Recibirás instrucciones por
                    correo electrónico sobre cómo hacerlo.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    {" "}
                    ¿Está segura la información personal almacenada en mi
                    cuenta?
                  </AccordionTrigger>
                  <AccordionContent>
                    Sí, en Artiheal nos tomamos la seguridad de la información
                    personal muy en serio. Utilizamos medidas de seguridad
                    avanzadas para proteger tus datos y garantizar tu
                    privacidad.
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="border border-s p-6 rounded-md sm:w-9/12 mb-6">
                <div className="flex flex-row items-center">
                  <CalendarDays className="h-6 w-6 text-primary select-none mr-1" />
                  <h3 className="text-2xl font-bold text-primary">Rutina</h3>
                </div>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    {" "}
                    ¿Por dónde puedo comenzar al crear una rutina saludable?
                  </AccordionTrigger>
                  <AccordionContent>
                    El primer paso es identificar tus objetivos de bienestar, ya
                    sea mejorar la alimentación, incorporar el ejercicio o
                    reducir el estrés. Establecer metas claras te ayudará a dar
                    forma a tu rutina ideal.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>
                    ¿Qué elementos deben incluirse en una rutina?
                  </AccordionTrigger>
                  <AccordionContent>
                    Una rutina saludable suele incluir una dieta equilibrada,
                    actividad física regular, descanso de calidad y herramientas
                    para la gestión del estrés. Estos son los pilares de un
                    estilo de vida saludable.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    {" "}
                    ¿Dónde puedo obtener apoyo adicional para crear y mantener
                    mi rutina?
                  </AccordionTrigger>
                  <AccordionContent>
                    Puedes obtener apoyo adicional a través de recursos en
                    línea, aplicaciones de salud y bienestar, grupos de apoyo
                    local o incluso consultando a un profesional de la salud.
                  </AccordionContent>
                </AccordionItem>
              </div>

              <div className="border border-s p-6 rounded-md sm:w-9/12 mb-6">
                <div className="flex flex-row items-center">
                  <Gem className="h-6 w-6 text-primary select-none mr-1" />
                  <h3 className="text-2xl font-bold text-primary">Puntos</h3>
                </div>
                <AccordionItem value="item-7">
                  <AccordionTrigger>
                    ¿Qué debo hacer para ganar puntos?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ganar puntos en Artiheal es fácil. Simplemente sigue tus
                    rutinas, alcanza tus metas y completa desafíos. Cada logro
                    te otorgará puntos que podrás canjear en nustras tiendas y
                    marcas asociadas.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-8">
                  <AccordionTrigger>
                    ¿Los puntos tienen fecha de expiración?
                  </AccordionTrigger>
                  <AccordionContent>
                    No, los puntos de Artiheal no expiran. Puedes acumularlos y
                    canjearlos en el momento que prefieras. Esto te da la
                    flexibilidad de utilizar tus puntos cuando encuentres la
                    oferta o el producto que más te convenga.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-9">
                  <AccordionTrigger>
                    ¿Puedo transferir mis puntos a otro usuario?
                  </AccordionTrigger>
                  <AccordionContent>
                    Lamentablemente, los puntos no son transferibles, esto se
                    debe a que están diseñados para recompensar tus esfuerzos y
                    compromiso individual en tu búsqueda de un estilo de vida
                    más saludable.
                  </AccordionContent>
                </AccordionItem>
              </div>
            </div>
          </Accordion>
        </article>
      </section>
    </>
  );
};

export default Help;
