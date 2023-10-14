import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import SignLabel from "../ui/signlabel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Store } from "../../Store";
import Axios, { AxiosError } from "axios";
import { getError } from "@/lib/utils";

const UserAccount = () => {
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch: ctxDispatch } = useContext(Store)!;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!file) {
      setSuccess(null);
      setApiError("Por favor, cargue una imagen.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userInfo._id);

    try {
      const response = await Axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setApiError(null);
      userInfo.pictureURL = response.data.publicUrl;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      ctxDispatch({ type: "UPDATE_PICTURE_URL", payload: response.data.publicUrl });
      setSuccess("Foto de perfil cambiada exitosamente.");
      // Clear the success message after 5 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 5000);
    } catch (err: any) {
      setSuccess(null);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400 || status === 404) {
          setApiError(getError(err as AxiosError) as string);
        } else if (status === 500 && data.message === "File too large") {
          setApiError("El tamaño de la imagen excede el límite de 1MB.");
        } else {
          setApiError(
            "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
          );
        }
      }
    }
    setIsLoading(false); // Reset loading state
  };

  return (
    <>
      <Helmet>
        <title>Mi Cuenta | Artiheal</title>
      </Helmet>
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-6/12 p-4 flex flex-col items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">
          Cambiar Foto de Perfil
        </h1>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-5">
          <div className="mr-4">
            <Avatar className="h-20 w-20 min-w-[2.5rem]">
              <AvatarImage
                src={`${userInfo.pictureURL}`}
                alt={`${userInfo.firstName}_profile_picture`}
              />
              <AvatarFallback className="bg-primary font-semibold text-background text-xl">
                {userInfo.firstName.charAt(0)}
                {userInfo.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          <div>
            <form onSubmit={handleSubmit}>
              <Label htmlFor="picture" className="text-tertiary">
                Subir Imagen
              </Label>
              <div className="flex flex-row space-x-2 items-center mt-1">
                <Input
                  type="file"
                  name="file"
                  id="picture"
                  onChange={handleFileUpload}
                  accept=".jpg, .jpeg, .png, .webp"
                />
                <Button variant="special" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-background"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Cargando...
                    </>
                  ) : (
                    "Subir"
                  )}
                </Button>
              </div>
              <div className="flex flex-row justify-start w-full mt-3 h-[20px]">
                {apiError && <SignLabel variant="error" message={apiError} />}
                {success && <SignLabel variant="success" message={success} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
