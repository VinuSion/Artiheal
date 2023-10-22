import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import SignLabel from "@ui/sign-label";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@/Store";
import Axios from "axios";
import ForgotPasswordDialog from "./modules/ForgotPasswordDialog";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

  const { dispatch: ctxDispatch } = useContext(Store)!;

  type FormData = {
    email: string;
    password: string;
  };

  const formSchema: ZodType<FormData> = z.object({
    email: z.string().min(1, "Este campo es requerido"),
    password: z.string().min(1, "Este campo es requerido"),
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
    // Compare user input with User data with Axios
    try {
      const response = await Axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });

      const userData = response.data; // Access the response data
      ctxDispatch({ type: "USER_SIGNIN", payload: userData });
      // Set new localStorage auth with userInfo
      localStorage.setItem("userInfo", JSON.stringify(userData));
      // Navigate to /home
      navigate("/home/dashboard");
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setApiError("Correo o Contraseña inválidos. Inténtelo nuevamente.");
      } else {
        setApiError(
          "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Ingresar | Artiheal</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
        <main className="flex flex-col place-items-center">
          <div className="shadow-2xl p-6 rounded-lg bg-background w-11/12 sm:w-[450px]">
            <div className="icon flex items-center justify-center">
              <img
                className="h-12 w-12 select-none"
                src="/artiheal-logo-purple.svg"
                alt="logo"
              />
              <span className="font-bold ml-1 select-none text-lg">
                Artiheal
              </span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg my-7 ">Iniciar Sesión</h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent">
                <Link className="text-primary" to="/">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(submitData)}>
              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="email" className="text-tertiary">Correo electrónico</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Correo electrónico"
                  {...register("email")}
                />
                <div className="sm:h-[20px]">
                  {errors.email && (
                    <SignLabel variant="error" message={errors.email.message} />
                  )}
                </div>
              </div>

              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="password" className="text-tertiary">Contraseña</Label>
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
                      <Eye className="h-5 w-5 text-primary" />
                    ) : (
                      <EyeOff className="h-5 w-5 text-primary" />
                    )}
                  </Button>
                </div>
                <div className="sm:h-[20px]">
                  {errors.password && !apiError && (
                    <SignLabel
                      variant="error"
                      message={errors.password.message}
                    />
                  )}
                  {apiError && <SignLabel variant="error" message={apiError} />}
                </div>
              </div>

              <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
                <Checkbox id="sesion" />
                <Label htmlFor="sesion" className="text-tertiary text-xs sm:text-base">Mantener iniciada mi sesión</Label>
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
            </form>

            <div className="flex flex-col">
              <span className="text-tertiary text-xs sm:text-sm">
                ¿No tienes cuenta?
                <Link
                  className="text-primary ml-1 hover:underline"
                  to="/signup"
                >
                  Crear cuenta
                </Link>
              </span>
              <span className="text-tertiary text-xs sm:text-sm">
                ¿Olvidaste la Contraseña?
                <ForgotPasswordDialog />
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
