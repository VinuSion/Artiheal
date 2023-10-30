import { Helmet } from "react-helmet-async";
import { Gem } from "lucide-react";
import { Button } from "@ui/button";

export const cardProInfo = [
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/3364b1d6-4d37-4e67-891a-424b37498c25",
    spanTitle: "Ensalada Mcdonalds",
    spanMessage:
      "20 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/81f0d2c7-8d12-433e-8004-26f4ab8ee73a",
    spanTitle: "Jugo de naranja Exito",
    spanMessage:
      "20 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/3f66483d-6408-423e-b45d-fbe4cb6f9509",
    spanTitle: "Ensalada KFC",
    spanMessage:
      "20 puntos",
  },

  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/21341599-f809-49ab-a450-e00b30524d7f",
    spanTitle: "Funko Darth Vader",
    spanMessage:
      "45 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/b1cb9d14-3fa4-4cd2-860f-4cd25f5a8408",
    spanTitle: "Gift Card Microsoft",
    spanMessage:
      "55 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/8b9d0cda-f811-444d-bbba-51a8f80e89cc",
    spanTitle: "Audifonos Apple",
    spanMessage:
      "60 puntos",
  },

  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/15214bf3-4ef9-46e4-a96a-c1a9665dcbf4",
    spanTitle: "Balón Adidas",
    spanMessage:
      "70 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/ee3107ae-18d0-4e69-80c0-27106fb8334f",
    spanTitle: "Zapatos Adidas",
    spanMessage:
      "95 puntos",
  },
  {
    productImage: "https://github.com/VinuSion/Artiheal/assets/146145167/6c9652a9-8721-4f35-88c2-4615194aa43c",
    spanTitle: "Camiseta Adidas",
    spanMessage:
      "105 puntos",
  },
];

const CardPro: React.FC<{
  spanTitle: string;
  spanMessage: string;
  productImage: string;
}> = ({ productImage, spanTitle, spanMessage }) => (
  <div className="p-[2px] my-2 sm:mx-10 rounded-2xl bg-gradient-to-tr from-violet-400 via-background to-violet-400">
    <div className="w-52 h-auto bg-slate-50 p-3 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-center">
        <img src={productImage} className="h-32 w-32 mb-1 rounded-md border border-s" />
      </div>
      <span className="text-md font-bold flex items-center justify-center mb-1">
        {spanTitle}
      </span>
      <div className="overflow-hidden">
        <Button className=" w-full" variant="speround" size="sm">
        <Gem className="h-3 w-3 text-white select-none mr-1" />
          {spanMessage}
        </Button>
      </div>
    </div>
  </div>
);

const Points = () => {
  return (
    <div>
      <Helmet>
        <title>Tus Puntos | Artiheal</title>
      </Helmet>
      <section className="flex flex-row justify-center mb-6">
        <article className="cont rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl">
          <div className="rounded-xl bg-background w-full p-4 flex flex-col items-center">
            <div className="sm:w-9/12 mb-8">
              <div className="flex flex-row items-center">
                <Gem className="h-8 w-8 text-primary select-none mr-2" />
                <h2 className="font-bold text-2xl sm:text-4xl py-4 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 via-purple-500 to-violet-200">
                  Tus puntos
                </h2>
              </div>

              <span className="text-sm sm:text-base">
                Consulta los puntos producto de tu disciplina y conviertelos
                en <strong>asombrosos productos y servicios de nuestras marcas asociadas.</strong>
              </span>
            </div>

            <div className="sm:w-9/12 border border-s p-4 rounded-md">
              <h1 className="font-bold flex justify-center text-2xl mb-6">Resumen de puntaje</h1>
              <div className="contenedor flex flex-row justify-center" >
                <div className="parte 1 flex flex-row items-center">
                  <div className="bg-gradient-to-br from-indigo-600 to via-purple-800 rounded-full w-28 h-28 flex justify-center items-center shadow-xl p-2 mr-4" >
                    <div className="rounded-full bg-white w-24 h-24 flex justify-center items-center">
                      <h1 className="font-bold flex justify-center items-center text-4xl">2</h1>
                    </div>
                  </div>

                  <div className="texto">
                    <h1 className="font-semibold text-xl mb-3 ">Te encuentras en el nivel 2</h1>
                    <span>
                      <strong>Puntos totales:</strong> 114
                    </span>
                    <p className="mt-3">
                      Para subir de nivel, necesitas 86 puntos
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="flex flex-row justify-center mb-6">
        <article className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl items-center">
            <h2 className="text-left font-bold text-2xl sm:text-4xl py-5 text-transparent bg-clip-text bg-gradient-to-tr from-indigo-600 via-purple-500 to-violet-200">
              Productos disponibles
            </h2>
           <div className="flex flex-row flex-wrap justify-center mr-1">
              {cardProInfo.map((info, index) => (
                <CardPro
                  key={index}
                  spanTitle={info.spanTitle}
                  spanMessage={info.spanMessage}
                  productImage={info.productImage}
                />
              ))}
            </div>
        </article>
      </section>
    </div>
  );
};

export default Points;
