import { Input } from "./ui/input";
import { useContext, useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import SignLabel from "./ui/signlabel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  EyeIcon,
  EyeSlashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import Axios, { AxiosError } from "axios";
import { Store } from "../Store";
import { getError } from "@/lib/utils";

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
      // Navigate to /dashboard
      navigate("/dashboard");
    } catch (err) {
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
          <div className="shadow-2xl p-6 rounded-lg bg-background">
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

            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg my-7">Iniciar Sesión</h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent">
                <Link className="text-primary" to="/">
                  <ArrowLeftIcon className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

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
                    <SignLabel variant="error" message={errors.email.message} />
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
            </form>

            <div className="flex flex-col">
              <span>
                ¿No tienes cuenta?
                <Link
                  className="text-primary ml-1 hover:underline"
                  to="/signup"
                >
                  Crear cuenta
                </Link>
              </span>
              <span>
                ¿Olvidaste la Contraseña?
                <Forgot />
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const Forgot = () => {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(600); // 10 minutes in seconds

  const startCountdown = () => {
    setIsCountdownActive(true);
    setRemainingTime(600); // Reset the countdown timer to 10 minutes
  };

  const formatTime = (time: any) => {
    return time < 10 ? `0${time}` : time;
  };

  useEffect(() => {
    let timer: any;
    if (isCountdownActive) {
      timer = setInterval(() => {
        if (remainingTime > 0) {
          setRemainingTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
          setIsCountdownActive(false);
          setSuccess(null);
          reset({ email: "" });
        }
      }, 1000); // Updates every second
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isCountdownActive, remainingTime]);

  type ForgotForm = {
    email: string;
  };

  const forgotSchema: ZodType<ForgotForm> = z.object({
    email: z
      .string()
      .min(1, "Este campo es requerido")
      .email({ message: "Correo electronico invalido" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const send = async (data: ForgotForm) => {
    try {
      const response = await Axios.post("/api/users/forgot-password", {
        email: data.email,
      });
      setEmailError(null);
      setSuccess(response.data.message);
      startCountdown();
    } catch (err) {
      setEmailError(getError(err as AxiosError) as string);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-primary ml-1 hover:underline">
        Cambiar Contraseña
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Solicitar cambiar la contraseña</DialogTitle>
          <DialogDescription>
            Ingresa el correo electronico que tienes asociado a tu cuenta.
            Nosotros nos encargamos de enviarte un enlace para cambiarlo.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(send)}>
          <div className="grid w-full max-w items-center gap-1.5">
            <div className="text-sm text-primary">
              {isCountdownActive && (
                <>
                  Tiempo restante: {Math.floor(remainingTime / 60)}:
                  {formatTime(remainingTime % 60)}
                </>
              )}
            </div>
            <div className="flex flex-row space-x-2">
              <Input
                type="email"
                id="email"
                placeholder="Correo electronico"
                disabled={isCountdownActive}
                {...register("email")}
              />
              <Button
                variant="special"
                type="submit"
                disabled={isSubmitting || isCountdownActive}
              >
                Enviar
              </Button>
            </div>

            <div className="h-[20px]">
              {errors.email && !emailError && (
                <SignLabel variant="error" message={errors.email.message} />
              )}
              {emailError && <SignLabel variant="error" message={emailError} />}
              {success && <SignLabel variant="success" message={success} />}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
