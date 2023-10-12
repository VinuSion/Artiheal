import { Input } from "./ui/input";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import SignLabel from "./ui/signlabel";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Helmet } from "react-helmet-async";
import Axios from "axios";

const Reset = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [passwordShown, setPasswordShown] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  type ResetFormData = {
    password: string;
    repeatPassword: string;
  };

  const resetFormSchema: ZodType<ResetFormData> = z
    .object({
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
      repeatPassword: z
        .string()
        .min(8, { message: "Las contraseñas no coinciden" })
        .max(20),
    })
    .refine((data) => data.password === data.repeatPassword, {
      path: ["repeatPassword"],
      message: "Las contraseñas no coinciden",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetFormSchema),
  });

  // Using Axios to send the reset password request
  const submitData = async (data: ResetFormData) => {
    try {
      const response = await Axios.post("/api/users/reset-password", {
        password: data.password,
        token,
      });
      setApiError(null);
      setSuccess(response.data.message);
      // Delay navigation to /login by 5 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setApiError(
          "Este enlace ha caducado. Por favor, solicite uno nuevo."
        );
      } else if (err.response && err.response.status === 404) {
        setApiError("No se encontro un usuario asociado a este enlace.");
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
        <title>Restablecer Contraseña | Artiheal</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
        <main className="flex flex-col place-items-center">
          <div className="shadow-2xl p-6 rounded-lg bg-background w-11/12 sm:w-[450px]">
            <div className="icon flex items-center justify-center">
              <img
                className="h-12, w-12 select-none"
                src="/artiheal-logo-purple.svg"
                alt="logo"
              />
              <span className="font-bold ml-1 select-none text-lg">
                Artiheal
              </span>
            </div>

            <h2 className="font-bold text-lg my-7">Restablecer Contraseña</h2>

            <form onSubmit={handleSubmit(submitData)}>
              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="password" className="text-tertiary">Nueva Contraseña</Label>
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
                    <SignLabel
                      variant="error"
                      message={errors.password.message}
                    />
                  )}
                </div>
              </div>

              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="repeatPassword" className="text-tertiary">
                  Confirmar Nueva Contraseña
                </Label>
                <Input
                  type="password"
                  id="repeatPassword"
                  placeholder="Confirmar Contraseña"
                  {...register("repeatPassword")}
                />
                <div className="h-[20px]">
                  {errors.repeatPassword && !apiError && (
                    <SignLabel
                      variant="error"
                      message={errors.repeatPassword.message}
                    />
                  )}
                  {apiError && <SignLabel variant="error" message={apiError} />}
                  {success && <SignLabel variant="success" message={success} />}
                </div>
              </div>

              <Button
                className="my-4 py-3 px-6"
                variant="special"
                size="sp"
                type="submit"
                disabled={isSubmitting}
              >
                Cambiar Contrasaña
              </Button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default Reset;
