import { Helmet } from "react-helmet-async";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";

const Help = () => {
  return (
    <>
      <Helmet>
        <title>Ayuda | Preguntas Frecuentes</title>
      </Helmet>
      <section className="flex items-center flex-col">
  <div className="faq-section text-left w-1/2 my-8 ">
    <h2 className="font-semibold text-4xl py-4">Soporte Artiheal</h2>
        <span >
          <strong>Necesitas ayuda?</strong> Revisa nuestro FAQ o contactanos.
        </span>
        <span className="block pt-2">
        Obtén las respuestas a las preguntas más frecuentes sobre Artiheal
        </span>
      </div>
    
      <article className="flex justify-center my-8 w-1/2 gap-6">
        <Accordion type="single" collapsible className="w-full">
        <div className="border border-s p-6 rounded-md mt-6">
          <h3 className="text-2xl font-bold text-primary">Section 1 </h3>
        <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </div>

        <div className="border border-s p-6 rounded-md mt-6">
          <h3 className="text-2xl font-bold text-primary">Section 2 </h3>
        <AccordionItem value="item-4">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </div>
        <div className="border border-s p-6 rounded-md mt-6">
          <h3 className="text-2xl font-bold text-primary">Section 3 </h3>
        <AccordionItem value="item-7">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-8">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </div>
         
        </Accordion>
      </article>
      </section>
    </>
  );
};

export default Help;
