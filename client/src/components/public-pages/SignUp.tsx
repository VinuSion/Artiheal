import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Checkbox } from "@ui/checkbox";
import SignLabel from "@ui/sign-label";
import Loading from "@ui/loading";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { normalizeName } from "@/lib/utils";
import Axios from "axios";

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);

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
        .min(3, { message: "Mínimo 3 caracteres (Nombre)" })
        .max(20, { message: "Maximo 20 caracteres (Nombre)" })
        .refine(
          (value) =>
            /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
              value
            ),
          {
            message: "Solo letras en el Nombre",
          }
        ),
      lastName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres (Apellido)" })
        .max(20, { message: "Maximo 20 caracteres (Apellido)" })
        .refine(
          (value) =>
            /^\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*(?:\s*[a-zA-ZáéíóúÁÉÍÓÚ]+\s*){0,3}$/.test(
              value
            ),
          {
            message: "Solo letras en el Apellido",
          }
        ),
      email: z.string().email({ message: "Correo electronico invalido" }),
      password: z
        .string()
        .min(8, "Contraseña debe tener minimo 8 caracteres")
        .refine(
          (password) => {
            return /[A-Z]/.test(password);
          },
          {
            message: "Contraseña debe contener al menos una letra mayúscula",
          }
        )
        .refine(
          (password) => {
            return /\d/.test(password);
          },
          {
            message: "Contraseña debe contener al menos un número",
          }
        )
        .refine(
          (password) => {
            return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);
          },
          {
            message: "Contraseña debe incluir al menos un carácter especial",
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

  // Submit SignUp Data with Axios
  const submitData = async (data: FormData) => {
    const trimmedFirstName = data.firstName.trim();
    const first = normalizeName(trimmedFirstName);

    const trimmedLastName = data.lastName.trim();
    const last = normalizeName(trimmedLastName);

    // Creates new User with Axios
    try {
      await Axios.post("/api/users/signup", {
        firstName: first,
        lastName: last,
        email: data.email,
        password: data.password,
      });

      // Navigate to /login
      navigate("/login");
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setApiError("Ya existe un usuario con ese correo electrónico.");
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
        <title>Crear Cuenta | Artiheal</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center overflow-y-hidden">
        <main className="flex flex-col place-items-center">
          <motion.div
            initial={{ y: "100vw", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", ease: "easeOut", duration: 0.8 }}
            className="shadow-2xl p-6 rounded-lg bg-background w-11/12 sm:w-[450px]"
          >
            <div className="icon flex items-center justify-center">
              <img
                className="h-12, w-12 select-none"
                src="/artiheal-logo-purple.svg"
                alt="logo"
              />
              <span className="font-bold ml-1 select-none">Artiheal</span>
            </div>

            <div className="flex items-center justify-between">
              <h2 className="font-bold my-7  text-base sm:text-lg">
                Crear Cuenta en Artiheal
              </h2>
              <div className="p-1 inline-flex items-center justify-center transition duration-300 hover:shadow-md focus:shadow-md border-solid border-2 rounded-lg bg-transparent">
                <Link className="text-primary" to="/">
                  <ArrowLeft className="h-5 w-5 text-primary" />
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit(submitData)}>
              <div className="flex flex-row gap-3.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="firstName" className="text-tertiary">
                    Nombre
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder="Nombre"
                    {...register("firstName")}
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="lastName" className="text-tertiary">
                    Apellido
                  </Label>
                  <Input
                    type="text"
                    id="lastName"
                    placeholder="Apellido"
                    {...register("lastName")}
                  />
                </div>
              </div>

              <div className="mt-2 sm:h-[20px] sm:mt-[0.4rem]">
                {errors.firstName && errors.lastName && (
                  <SignLabel
                    variant="error"
                    message={
                      errors.firstName.message ===
                        "Mínimo 3 caracteres (Nombre)" &&
                      errors.lastName.message ===
                        "Mínimo 3 caracteres (Apellido)"
                        ? "Minimo 3 caracteres (Nombre/Apellido)"
                        : errors.firstName.message ===
                            "Maximo 20 caracteres (Nombre)" &&
                          errors.lastName.message ===
                            "Maximo 20 caracteres (Apellido)"
                        ? "Maximo 20 caracteres (Nombre/Apellido)"
                        : errors.firstName.message ===
                            "Solo letras en el Nombre" &&
                          errors.lastName.message ===
                            "Solo letras en el Apellido"
                        ? "Solo letras en el Nombre/Apellido"
                        : "Nombre o Apellido invalido"
                    }
                  />
                )}
                {errors.firstName && !errors.lastName && (
                  <SignLabel
                    variant="error"
                    message={errors.firstName.message}
                  />
                )}
                {errors.lastName && !errors.firstName && (
                  <SignLabel
                    variant="error"
                    message={errors.lastName.message}
                  />
                )}
              </div>

              <div>
                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label htmlFor="email" className="text-tertiary">
                    Correo electronico
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Correo electronico"
                    {...register("email")}
                  />
                  <div className="sm:h-[20px]">
                    {errors.email && !apiError && (
                      <SignLabel
                        variant="error"
                        message={errors.email.message}
                      />
                    )}
                    {apiError &&
                    apiError ==
                      "Ya existe un usuario con ese correo electrónico." ? (
                      <SignLabel variant="error" message={apiError} />
                    ) : (
                      !apiError
                    )}
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label htmlFor="password" className="text-tertiary">
                    Contraseña
                  </Label>
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
                    Confirmar Contraseña
                  </Label>
                  <Input
                    type="password"
                    id="repeatPassword"
                    placeholder="Confirmar Contraseña"
                    {...register("repeatPassword")}
                  />
                  <div className="sm:h-[20px]">
                    {errors.repeatPassword && (
                      <SignLabel
                        variant="error"
                        message={errors.repeatPassword.message}
                      />
                    )}
                    {apiError &&
                    apiError ==
                      "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde." ? (
                      <SignLabel variant="error" message={apiError} />
                    ) : (
                      !apiError
                    )}
                  </div>
                </div>

                <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-2 mb-1">
                  <Checkbox id="terms" />
                  <Label
                    htmlFor="terms"
                    className="text-tertiary text-xs sm:text-base"
                  >
                    Aceptar terminos y condiciones
                  </Label>
                </div>
              </div>
              <Button
                className="my-3 py-3 px-6"
                variant="special"
                size="sp"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loading /> : "Crear Cuenta"}
              </Button>

              <span className="text-tertiary text-xs sm:text-base">
                ¿Ya estás en Artiheal?
                <Link
                  className="text-primary ml-1 hover:underline text-xs sm:text-base"
                  to="/login"
                >
                  Iniciar sesión
                </Link>
              </span>
            </form>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default SignUp;
