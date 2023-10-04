import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
    <main className="flex flex-col place-items-center">
        <div className="sign-up">
          <div className="icon flex items-center">
            <img
              className="h-20, w-20"
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
              <Input type="name" id="name" placeholder="Nombres" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-semibold" htmlFor="last-name">
                Apellidos
              </Label>
              <Input type="last-name" id="last-name" placeholder="Apellidos" />
            </div>
          </div>
          <div className="rest ">
            <div className="grid w-full max-w items-center gap-2 mt-5">
              <Label className="font-semibold" htmlFor="email">
                Email Address
              </Label>
              <Input type="email" id="email" placeholder="Nombres" />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label className="font-semibold" htmlFor="password">
                Password
              </Label>
              <Input type="password" id="password" placeholder="Nombres" />
            </div>
            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label className="font-semibold" htmlFor="password">
                Confirm password
              </Label>
              <Input type="password" id="password" placeholder="Nombres" />
            </div>
          </div>
          <Button className="my-6" size={"superbig"}>Continuar</Button>
          <span >Ya estás en Artihel? <Link  className="text-indigo-500"to="/login">Iniciar sesión</Link></span>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
