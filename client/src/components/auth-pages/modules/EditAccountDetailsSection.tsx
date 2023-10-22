import { useContext, useState } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import SignLabel from "@ui/sign-label";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@/Store";
import Axios, { AxiosError } from "axios";
import { getError } from "@/lib/utils";

const EditAccountDetailsSection = () => {
  const { dispatch: ctxDispatch } = useContext(Store)!;
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  const [passwordShown, setPasswordShown] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateFormSchema = z
    .object({
      firstName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres (Nombre)" })
        .max(20, { message: "Maximo 20 caracteres (Nombre)" })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚ]+$/.test(value), {
          message: "Solo letras en el Nombre",
        })
        .optional()
        .or(z.literal("")),
      lastName: z
        .string()
        .min(3, { message: "Mínimo 3 caracteres (Apellido)" })
        .max(20, { message: "Maximo 20 caracteres (Apellido)" })
        .refine((value) => /^[a-zA-ZáéíóúÁÉÍÓÚ]+$/.test(value), {
          message: "Solo letras en el Apellido",
        })
        .optional()
        .or(z.literal("")),
      email: z
        .string()
        .email({ message: "Correo electronico invalido" })
        .optional()
        .or(z.literal("")),
      currentPassword: z
        .string()
        .min(1, { message: "Este campo es requerido" }),
      newPassword: z
        .string()
        .min(8, "Contraseña debe tener minimo 8 caracteres")
        .refine(
          (newPassword) => {
            return /[A-Z]/.test(newPassword);
          },
          {
            message: "Contraseña debe contener al menos una letra mayúscula",
          }
        )
        .refine(
          (newPassword) => {
            return /\d/.test(newPassword);
          },
          {
            message: "Contraseña debe contener al menos un número",
          }
        )
        .refine(
          (newPassword) => {
            return /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(newPassword);
          },
          {
            message: "Contraseña debe incluir al menos un carácter especial",
          }
        )
        .optional()
        .or(z.literal("")),
      repeatNewPassword: z
        .string()
        .min(8, { message: "Las contraseñas no coinciden" })
        .max(20)
        .optional()
        .or(z.literal("")),
    })
    .refine((data) => data.newPassword === data.repeatNewPassword, {
      path: ["repeatNewPassword"],
      message: "Las contraseñas no coinciden",
    });

  type UpdateForm = z.infer<typeof updateFormSchema>;
  type UpdateFormFieldKey =
    | "firstName"
    | "lastName"
    | "email"
    | "newPassword"
    | "repeatNewPassword";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    clearErrors,
  } = useForm<UpdateForm>({
    resolver: zodResolver(updateFormSchema),
  });

  const submitData = async (data: UpdateForm) => {
    const fieldsToCheck: UpdateFormFieldKey[] = [
      "firstName",
      "lastName",
      "email",
      "newPassword",
      "repeatNewPassword",
    ];
    const isNotEmpty = fieldsToCheck.some((field) => !!data[field]);
    if (!isNotEmpty) {
      setError("repeatNewPassword", {
        type: "manual",
        message:
          "Para actualizar tus datos de cuenta, realize cambios en al menos un campo.",
      });
    } else {
      clearErrors();
      try {
        const request = await Axios.put(`/api/users/update/${userInfo._id}`, {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          currentPassword: data.currentPassword,
          password: data.newPassword,
        });
        setApiError(null);
        ctxDispatch({ type: "USER_SIGNIN", payload: request.data });
        localStorage.setItem("userInfo", JSON.stringify(request.data));
        setSuccess("Datos de usuario actualizado exitosamente.");
        // Clear the success message after 1.5 seconds
        setTimeout(() => {
          setSuccess(null);
          reset();
          window.location.reload();
        }, 1500);
      } catch (err: any) {
        setSuccess(null);
        if (err.response) {
          const { status } = err.response;
          status === 401
            ? setError("currentPassword", {
                type: "manual",
                message: "No es la contraseña correcta de tu cuenta.",
              })
            : status === 404
            ? setApiError(getError(err as AxiosError) as string)
            : setApiError(
                "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
              );
        }
      }
    }
  };

  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">
          Cambiar Datos de Cuenta
        </h1>
        <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-5 w-full md:w-11/12 lg:w-1/2">
          <div className="w-full">
            <form onSubmit={handleSubmit(submitData)}>
              <div className="flex flex-row gap-3.5">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="firstName" className="text-tertiary">
                    Nombre
                  </Label>
                  <Input
                    type="text"
                    id="firstName"
                    placeholder={userInfo.firstName}
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
                    placeholder={userInfo.lastName}
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
                    placeholder={userInfo.email}
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
                  <Label htmlFor="currentPassword" className="text-tertiary">
                    Contraseña Actual
                  </Label>
                  <Input
                    type="password"
                    id="currentPassword"
                    placeholder="Contraseña Actual"
                    {...register("currentPassword")}
                  />
                  <div className="sm:h-[20px]">
                    {errors.currentPassword && !apiError && (
                      <SignLabel
                        variant="error"
                        message={errors.currentPassword.message}
                      />
                    )}
                    {apiError &&
                    apiError ==
                      "Esa no es tu contraseña actual. Intentelo nuevamente." ? (
                      <SignLabel variant="error" message={apiError} />
                    ) : (
                      !apiError
                    )}
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label htmlFor="newPassword" className="text-tertiary">
                    Nueva Contraseña
                  </Label>
                  <div className="flex flex-row space-x-2">
                    <Input
                      type={passwordShown ? "text" : "password"}
                      id="newPassword"
                      placeholder="Nueva Contraseña"
                      {...register("newPassword")}
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
                    {errors.newPassword && (
                      <SignLabel
                        variant="error"
                        message={errors.newPassword.message}
                      />
                    )}
                  </div>
                </div>

                <div className="grid w-full max-w items-center gap-1.5 mt-2">
                  <Label htmlFor="repeatNewPassword" className="text-tertiary">
                    Confirmar Contraseña Nueva
                  </Label>
                  <Input
                    type="password"
                    id="repeatNewPassword"
                    placeholder="Confirmar Contraseña Nueva"
                    {...register("repeatNewPassword")}
                  />
                  <div className="sm:h-[20px]">
                    {errors.repeatNewPassword && (
                      <SignLabel
                        variant="error"
                        message={errors.repeatNewPassword.message}
                      />
                    )}
                    {apiError && (
                      <SignLabel variant="error" message={apiError} />
                    )}
                    {success && (
                      <SignLabel variant="success" message={success} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center my-2">
                {/* Clear Inputs Button */}
                <Button
                  variant="secondary"
                  disabled={isSubmitting}
                  onClick={() => {
                    clearErrors();
                    reset();
                  }}
                >
                  Limpiar
                </Button>

                {/* Save Changes Button */}
                <Button variant="special" type="submit" disabled={isSubmitting}>
                  Guardar Cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAccountDetailsSection;
