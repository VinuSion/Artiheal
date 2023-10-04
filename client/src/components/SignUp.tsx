import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <main className="flex flex-col place-items-center">
        <div className="sign-up shadow-xl p-6 rounded-lg">
          <div className="icon flex items-center">
            <img
              className="h-10, w-10"
              src="../public/artiheal-logo.svg"
              alt=""
            />
            <span className="font-bold ml-1">Artiheal</span>
          </div>
          <h2 className="font-bold text-lg my-8">Iniciar sesión en Artiheal</h2>
          <div className="inputs flex flex-row gap-3.5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-semibold" htmlFor="firstName">
                Nombres
              </Label>
              <Input
                type="firstName"
                id="firstName"
                placeholder="Nombres"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-semibold" htmlFor="lastName">
                Apellidos
              </Label>
              <Input
                type="lastName"
                id="lastName"
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
                type="password"
                id="password"
                placeholder="Contraseña"
              />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label className="font-semibold" htmlFor="repeatPassword">
                Confirmar Contraseña
              </Label>
              <Input
                type="password"
                id="confirm-password"
                placeholder="Repetir Contraseña"
              />
            </div>
          </div>
          <Button
            className=" my-4 bg-gradient-to-r from-purple-400 to-violet-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-3 px-6  shadow-lg transform transition-all duration-500 ease-in-out hover:brightness-110"
            size={"superbig"}
          >
            Continuarghgjhh
          </Button>
          <span>
            Ya estás en Artiheal? 
            <Link className="text-indigo-500 ml-2 hover:underline" to="/login">
              Iniciar sesión
            </Link>
          </span>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
