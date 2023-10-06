import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { Checkbox } from "./ui/checkbox";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  handleLogin: () => void;
}

const SignUp = ({ handleLogin }: SignUpProps) => {
  
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
  };

  const formSchema: ZodType<FormData> = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres" })
        .max(20, { message: "Maximo 20 caracteres" })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚ]+$/.test(value), {
          message: "Solo letras en el nombre",
        }),
      lastName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres" })
        .max(20, { message: "Maximo 20 caracteres" })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚ]+$/.test(value), {
          message: "Solo letras en el apellido",
        }),
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
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Submit SignUp Data to MongoDB
  const submitData = (data: FormData) => {
    console.log("submit", data);
    // Create new User with MongoDB

    // Auth with Stytch

    //
    handleLogin();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
      <main className="flex flex-col place-items-center">
        <div className="sign-up shadow-2xl p-6 rounded-lg bg-background">
          <div className="icon flex items-center justify-center">
            <img
              className="h-12, w-12 select-none"
              src="/artiheal-logo.svg"
              alt="logo"
            />
            <span className="font-bold ml-1 select-none">Artiheal</span>
          </div>
          <h2 className="font-bold text-lg my-7">Crear Cuenta en Artiheal</h2>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="inputs flex flex-row gap-3.5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="firstName">Nombres</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder="Nombres"
                  {...register("firstName")}
                />
                <div className="h-[20px]">
                  {errors.firstName && (
                    <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                      <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                      {errors.firstName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  type="text"
                  id="lastName"
                  placeholder="Apellidos"
                  {...register("lastName")}
                />
                <div className="h-[20px]">
                  {errors.lastName && (
                    <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                      <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
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
                </div>
              </div>

              <div className="grid w-full max-w items-center gap-1.5 mt-2">
                <Label htmlFor="repeatPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  id="repeatPassword"
                  placeholder="Repetir Contraseña"
                  {...register("repeatPassword")}
                />
                <div className="h-[20px]">
                  {errors.repeatPassword && (
                    <span className="inline-flex items-center w-auto text-xs bg-red-100 rounded text-red-600 p-[2px] px-2">
                      <ExclamationTriangleIcon className="h-3 w-3 text-red-600 mr-1" />
                      {errors.repeatPassword.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
                <Checkbox id="terms" />
                <Label htmlFor="terms">Aceptar terminos y condiciones</Label>
              </div>

            </div>
            <Button
              className="my-3 py-3 px-6"
              variant="special"
              size="sp"
              type="submit"
              disabled={isSubmitting}
            >
              Continuar
            </Button>

            <span>
              ¿Ya estás en Artiheal?
              <Link className="text-primary ml-1 hover:underline" to="/login">
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
