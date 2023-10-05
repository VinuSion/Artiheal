import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  handleLogin: () => void;
}

const SignUp = ({ handleLogin }: SignUpProps) => {
  const navigate = useNavigate();

  const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Perform signup logic
    // ...

    // Call handleLogin to authenticate the user after successful signup
    handleLogin();
    navigate("/dashboard");
    // Redirect or perform other actions as needed
    // ...
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
      <main className="flex flex-col place-items-center">
        <div className="sign-up shadow-2xl p-6 rounded-lg bg-background">
          <div className="icon flex items-center justify-center">
            <img className="h-12, w-12 select-none" src="/artiheal-logo.svg" alt="logo" />
            <span className="font-bold ml-1 select-none">Artiheal</span>
          </div>
          <h2 className="font-bold text-lg my-7">Crear Cuenta en Artiheal</h2>
          <form>
            <div className="inputs flex flex-row gap-3.5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstName">Nombres</Label>
                <Input type="text" id="firstName" placeholder="Nombres" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input type="text" id="lastName" placeholder="Apellidos" />
              </div>
            </div>
            <div>
              <div className="grid w-full max-w items-center gap-2 mt-5">
                <Label htmlFor="email">Correo electronico</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Correo electronico"
                />
              </div>
              <div className="grid w-full max-w items-center gap-1.5 mt-5">
                <Label htmlFor="password">Contraseña</Label>
                <Input type="password" id="password" placeholder="Contraseña" />
              </div>
              <div className="grid w-full max-w items-center gap-1.5 mt-5">
                <Label htmlFor="repeatPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  id="repeatPassword"
                  placeholder="Repetir Contraseña"
                />
              </div>
              <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-5">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Aceptar terminos y condiciones</Label>
              </div>
            </div>
            <Button
              className="my-4 py-3 px-6"
              variant="special"
              size="sp"
              onClick={handleSignUpClick}
            >
              Continuar
            </Button>
            <span className="flex justify-center">
              ¿Ya estás en Artiheal?
              <Link
                className="text-indigo-600 ml-1 hover:underline"
                to="/login"
              >
                Iniciar sesión
              </Link>
            </span>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignUp;
