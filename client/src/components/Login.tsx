import { Input } from "./ui/input";
import { useContext, useState } from "react";
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
import { Helmet } from "react-helmet-async";
import Axios, { AxiosError } from "axios";
import { Store } from "../Store";
import { getError } from "@/lib/utils";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();
  // MAKE IT SO THIS ERROR GOES AWAY WHEN THE USER INPUTS A USER THAT DOESNT EXIST
  const [apiError, setApiError] = useState<string | null>(null);

  const { dispatch: ctxDispatch } = useContext(Store)!;
  
  type FormData = {
    email: string;
    password: string;
  };

  const formSchema: ZodType<FormData> = z.object({
    email: z.string().min(1, "Ingrese un correo electronico"),
    password: z.string().min(1, "Ingrese una contraseña"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Use Axios to find a User
  const submitData = async (data: FormData) => {
    // console.log("submit", data);
    // Compare user input with User data with Axios
    try {
      // CHANGE THE AXIOS URL TO BE HIDDEN WITH A .ENV.LOCAL OR ACCESS .ENV IN SERVER SOMEHOW
      const response = await Axios.post("http://localhost:4000/api/users/login", {
        email: data.email,
        password: data.password,
      });

      const userData = response.data; // Access the response data
      ctxDispatch({ type: "USER_SIGNIN", payload: userData });
      // Set new localStorage auth with userInfo
      localStorage.setItem("userInfo", JSON.stringify(userData));
      // Navigate to /dashboard
      navigate("/dashboard");
    } catch (err) {
      // MAKE IT SO THIS ERROR GOES AWAY WHEN THE USER INPUTS A USER THAT DOES EXIST
      setApiError(getError(err as AxiosError) as string);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Artiheal</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
        <main className="flex flex-col place-items-center">
          <div className="log-in shadow-2xl p-6 rounded-lg bg-background">
            <div className="icon flex items-center justify-center">
              <img
                className="h-12, w-12 select-none"
                src="/artiheal-logo.svg"
                alt="logo"
              />
              <span className="font-bold ml-1 select-none text-lg">
                Artiheal
              </span>
            </div>

            <h2 className="font-bold text-lg my-7">Iniciar Sesión</h2>

            <form onSubmit={handleSubmit(submitData)}>
              <div className="grid w-full max-w items-center gap-1.5 mt-2">
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

              <div className="grid w-full max-w items-center gap-1.5 mt-2">
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
                  {apiError && (
                    <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                      <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                      {apiError}
                    </span>
                  )}
                </div>
              </div>

              <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
                <Checkbox id="sesion" />
                <Label htmlFor="sesion">Mantener iniciada mi sesión</Label>
              </div>

              <Button
                className="my-4 py-3 px-6"
                variant="special"
                size="sp"
                type="submit"
                disabled={isSubmitting}
              >
                Iniciar Sesión
              </Button>

              <span>
                ¿No tienes cuenta?
                <Link
                  className="text-primary ml-1 hover:underline"
                  to="/signup"
                >
                  Crear cuenta
                </Link>
              </span>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
