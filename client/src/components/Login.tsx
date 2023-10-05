import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";


interface LoginProps {
  handleLogin: () => void; // Adjust the type of handleLogin as needed
}

const Login = ({ handleLogin }: LoginProps) => {
  const [passwordShown, setPasswordShown] = useState(false);

  type FormData = {
    email: string;
    password: string;
  };
  const formSchema: ZodType<FormData> = z.object({
    email: z.string().email({ message: "Correo electronico invalido" }),
    password: z
      .string()
      .min(8, "Contraseña debe tener minimo 8 caracteres")
      .refine(
        (password) => {
          return /[A-Z]/.test(password);
        },
        {
          message: "Contraseña debe tener por lo menos una letra mayuscula",
        }
      )
      .refine(
        (password) => {
          return /\d/.test(password);
        },
        {
          message: "Contraseña debe tener por lo menos un numero",
        }
      )
      .refine(
        (password) => {
          return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
        },
        {
          message: "Contraseña debe tener por lo menos un caracter especial",
        }
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });
  const submitData = (data: FormData) => {
    console.log("submit", data);
  };
  const navigate = useNavigate();

  const handleLoginClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Perform authentication logic
    // ...

    // Call the handleLogin function to update authentication state
    handleLogin();
    navigate("/dashboard");
    // Redirect to the HomePage after successful login
    // Assuming that 'handleLogin' updates 'isAuth' state
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
      <main className="flex flex-col place-items-center">
        <div className="log-in shadow-2xl p-6 rounded-lg bg-background">
          <div className="icon flex items-center justify-center">
            <img
              className="h-12, w-12 select-none"
              src="/artiheal-logo.svg"
              alt="logo"
            />
            <span className="font-bold ml-1 select-none text-lg">Artiheal</span>
          </div>

          <h2 className="font-bold text-lg my-7">Iniciar Sesión</h2>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="grid w-full max-w items-center gap-2 mt-5">
              <Label htmlFor="email">Correo electronico</Label>
              <Input
                type="email"
                id="email"
                placeholder="Correo electronico"
                {...register("email")}
              />
              <div className="h-[20px]">
                {errors.email && (
                  <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                    <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid w-full max-w items-center gap-1.5 mt-5">
              <Label htmlFor="password">Contraseña</Label>
              <div className="flex flex-row space-x-2">
                  <Input
                    type={passwordShown ? "text" : "password"}
                    id="password"
                    placeholder="Contraseña"
                    {...register("password")}
                  />
                  <Button
                    size="icon"
                    variant="icon"
                    type="button"
                    className="transition duration-300 hover:shadow-md focus:shadow-md"
                    onClick={() => setPasswordShown(!passwordShown)}
                  >
                    {passwordShown ? (
                      <EyeIcon className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeSlashIcon className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                </div>
                <div className="h-[20px]">
                  {errors.password && (
                    <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                      <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                      {errors.password.message}
                    </span>
                  )}
                </div>
            </div>

            <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-5">
              <Checkbox id="sesion" />
              <Label htmlFor="sesion">Mantener iniciada mi sesión</Label>
            </div>

            <Button
              className="my-4 py-3 px-6"
              variant="special"
              size="sp"
              disabled={isSubmitting}
              // onClick={handleLoginClick}

            >
              Iniciar Sesión
            </Button>

            <span>
              ¿No tienes cuenta?
              <Link className="text-primary ml-1 hover:underline" to="/signup">
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
