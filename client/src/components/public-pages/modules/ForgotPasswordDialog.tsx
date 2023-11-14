import { useState, useEffect } from "react";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Send } from "lucide-react";
import { KeySquare } from "lucide-react";
import SignLabel from "@ui/sign-label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";

const ForgotPasswordDialog = () => {
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

  const sendEmail = async (data: ForgotForm) => {
    try {
      const response = await Axios.post("/api/users/forgot-password", {
        email: data.email,
      });
      setEmailError(null);
      setSuccess(response.data.message);
      startCountdown();
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        setEmailError("No existe un usuario con ese correo electrónico.");
      } else {
        setEmailError(
          "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
        );
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="text-primary ml-1 hover:underline">
        Cambiar Contraseña
      </DialogTrigger>
      <DialogContent className="w-11/12 sm:w-full rounded-md">
        <DialogHeader>
          <DialogTitle className="text-left flex flex-row items-center">
            <KeySquare className="h-4 w-4 mr-1" />
            Solicitar cambiar la contraseña
          </DialogTitle>
          <DialogDescription className="text-left text-xs sm:text-sm">
            Ingresa el correo electrónico que tienes asociado a tu cuenta.
            Nosotros nos encargamos de enviarte un enlace para cambiarlo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(sendEmail)}>
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
                <Send className="h-4 w-4 mr-1" strokeWidth={3} />
                <span>Enviar</span>
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

export default ForgotPasswordDialog;
