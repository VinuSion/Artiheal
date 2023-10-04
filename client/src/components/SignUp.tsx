import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="flex flex-col place-items-center">
        <div className="sign-up shadow-xl p-6 rounded-lg">
          <div className="icon flex items-center">
            <img
              className="h-14, w-14"
              src="../public/artiheal-logo.svg"
              alt=""
            />
            <span className="font-bold">Artiheal</span>
          </div>
          <h2 className="font-bold text-lg my-8">Iniciar sesión en Artiheal</h2>
          <div className="inputs flex flex-row gap-3.5  ">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-semibold" htmlFor="name">
                Nombres
              </Label>
              <Input
                className="border rounded-lg p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-indigo-500"
                type="name"
                id="name"
                placeholder="Nombres"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-semibold" htmlFor="last-name">
                Apellidos
              </Label>
              <Input
                className="border rounded-lg p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-indigo-500"
                type="last-name"
                id="last-name"
                placeholder="Apellidos"
              />
            </div>
          </div>
          <div className="rest ">
            <div className="grid w-full max-w items-center gap-2 mt-5">
              <Label className="font-semibold" htmlFor="email">
                Correo electronico
              </Label>
              <Input
                className="border rounded-lg p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-indigo-500"
                type="email"
                id="email"
                placeholder="Correo electronico"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label className="font-semibold" htmlFor="password">
                Contraseña
              </Label>
              <Input
                className="border rounded-lg p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-indigo-500"
                type="password"
                id="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label className="font-semibold" htmlFor="password">
                Confirmar Contraseña
              </Label>
              <Input
                className="border rounded-lg p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:ring-indigo-500"
                type="password"
                id="confirm-password"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <Button
            className=" my-4 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-indigo-300 hover:to-purple-600 text-white font-bold py-3 px-6  shadow-lg transform transition-all duration-500 ease-in-out hover:brightness-110 hover:animate-pulse active:animate-bounce"
            size={"superbig"}
          >
            Continuar
          </Button>
          <span>
            Ya estás en Artiheal?{" "}
            <Link className="text-indigo-500" to="/login">
              Iniciar sesión
            </Link>
          </span>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
