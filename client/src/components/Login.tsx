import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  handleLogin: () => void; // Adjust the type of handleLogin as needed
}

const Login = ({ handleLogin }: LoginProps) => {

  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Perform authentication logic
    // ...

    // Call the handleLogin function to update authentication state
    handleLogin();
    navigate('/dashboard');
    // Redirect to the HomePage after successful login
    // Assuming that 'handleLogin' updates 'isAuth' state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
      <main className="flex flex-col place-items-center">
        <div className="log-in shadow-2xl p-6 rounded-lg bg-background">

          <div className="icon flex items-center justify-center">
            <img className="h-14, w-14 select-none" src="/artiheal-logo.svg" alt="logo" />
            <span className="font-bold ml-1 select-none text-lg">Artiheal</span>
          </div>

          <h2 className="font-bold text-lg my-7">Iniciar Sesión</h2>
          <form>

            <div className="grid w-full max-w items-center gap-2 mt-5">
              <Label htmlFor="email">Correo electronico</Label>
              <Input type="email" id="email" placeholder="Correo electronico" />
            </div>

            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label htmlFor="password">Contraseña</Label>
              <Input type="password" id="password" placeholder="Contraseña" />
            </div>

            <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-5">
              <Checkbox id="sesion" />
              <Label htmlFor="sesion">Mantener iniciada mi sesión</Label>
            </div>

            <Button className="my-4 py-3 px-6" variant="special" size="sp" onClick={handleLoginClick}>
              Iniciar Sesión
            </Button>
           
            <span>
                ¿No tienes cuenta?
                <Link
                  className="text-indigo-600 ml-1 hover:underline"
                  to="/SignUp">
                  Crear cuenta
                </Link>
            </span>
           
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
