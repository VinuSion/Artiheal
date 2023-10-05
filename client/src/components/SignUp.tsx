import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
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
  const navigate = useNavigate();

  const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the default form submission
    // Perform signup logic
    // ...

    // Call handleLogin to authenticate the user after successful signup
    handleLogin();
    navigate("/dashboard");
    // Redirect or perform other actions as needed
    // ...
  };

  type FormData = {
    name: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    terms:boolean;
  };

  const schema: ZodType<FormData> = z
    .object({
      name: z.string().min(3, {message:"Mínimo 3 caracteres, máximo 20"}).max(20),
      lastName: z.string().min(3, {message:"Mínimo 3 caracteres, máximo 20"}).max(20),
      email: z.string().email({message:"Ingresa un correo válido."}),
      password: z.string().min(8, {message:"Mínimo 8 caracteres, máximo 20."}).max(20),
      repeatPassword: z.string().min(8, {message: "Las contaseñas no coinciden."}).max(20),
      terms:z.boolean()
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: "Las contraseñas no coinciden",
      path: ["repeatPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  
  const submitData = (data: FormData) => {
    console.log("submit", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-splash-image bg-cover bg-no-repeat bg-center">
      <main className="flex flex-col place-items-center">
        <div className="sign-up shadow-2xl p-6 rounded-lg bg-background">
          <div className="icon flex items-center justify-center">
            <img className="h-12, w-12 select-none" src="/artiheal-logo.svg" alt="logo" />
            <span className="font-bold ml-1 select-none">Artiheal</span>
          </div>
          <h2 className="font-bold text-lg my-7">Crear Cuenta en Artiheal</h2>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="inputs flex flex-row gap-3.5">
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">Nombres</Label>
                <Input
                  type="name"
                  id="name"
                  placeholder="Nombres"
                  {...register("name")}
                />
                {errors.name && <span className="text-sm text-indigo-500 ">{errors.name.message}</span>}
              </div>

              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="lastName">Apellidos</Label>
                <Input
                  type="lastName"
                  id="lastName"
                  placeholder="Apellidos"
                  {...register("lastName")}
                />
                {errors.lastName && <span className="text-sm text-indigo-500">{errors.lastName.message}</span>}
              </div>
            </div>
            <div>
              <div className="grid w-full max-w items-center gap-2 mt-5">
                <Label htmlFor="email">Correo electronico</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Correo electronico"
                  {...register("email")}
                />
                {errors.email && <span className="text-sm text-indigo-500">{errors.email.message}</span>}
              </div>
              <div className="grid w-full max-w items-center gap-1.5 mt-5">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Contraseña"
                  {...register("password")}
                />
                {errors.password && <span className="text-sm text-indigo-500">{errors.password.message}</span>}
              </div>
              <div className="grid w-full max-w items-center gap-1.5 mt-5">
                <Label htmlFor="repeatPassword">Confirmar Contraseña</Label>
                <Input
                  type="password"
                  id="repeatPassword"
                  placeholder="Repetir Contraseña"
                  {...register("repeatPassword")}
                />
                {errors.repeatPassword && <span className="text-sm text-indigo-500">{errors.repeatPassword.message}</span>}
              </div>
              <div className="items-top flex space-x-1 w-full max-w items-center gap-1.5 mt-5">
                <Checkbox id="terms"  defaultChecked={false}  {...register("terms")} />
                {errors.terms && <span className="text-sm text-indigo-500">{errors.terms.message}</span>}
                <Label htmlFor="terms">Aceptar terminos y condiciones</Label>
              </div>
            </div>
            <Button className="my-4 py-3 px-6" variant="special" size="sp" onClick={handleSignUpClick} type="submit">
              Continuar
            </Button>
            <span>
              ¿Ya estás en Artiheal?
              <Link
                className="text-indigo-600 ml-1 hover:underline"
                to="/login"
              >
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
