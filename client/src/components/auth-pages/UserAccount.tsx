import { useContext, useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import SignLabel from "@ui/sign-label";
import Loading from "@ui/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trash2, Upload } from "lucide-react";
import { Store } from "@/Store";
import Axios, { AxiosError } from "axios";
import { getError } from "@/lib/utils";
import EditAccountDetailsSection from "./modules/EditAccountDetailsSection";
import SettingsSection from "./modules/SettingsSection";
import DeleteAccountSection from "./modules/DeleteAccountSection";

interface UserAccountProps {
  handleLogout: () => void;
}

const UserAccount = ({ handleLogout }: UserAccountProps) => {
  const { dispatch: ctxDispatch } = useContext(Store)!;
  const userInfoString = localStorage.getItem("userInfo")!;
  const userInfo = JSON.parse(userInfoString);

  const [apiError, setApiError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [pfpDeleting, setPfpDeleting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
      ctxDispatch({
        type: "UPDATE_PICTURE_URL",
        payload: response.data.publicUrl,
      });
      setSuccess("Foto de perfil actualizada exitosamente.");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
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

  const removeProfilePicture = async () => {
    setPfpDeleting(true);
    // Let the user know in 2.5 seconds that their pfp is being deleted before attempting to delete it.
    await new Promise((resolve) => setTimeout(resolve, 2500));
    try {
      const response = await Axios.delete("/api/upload/remove", {
        data: { userId: userInfo._id },
      });

      if (response.status === 200) {
        setPfpDeleting(false);
        setApiError(null);
        userInfo.pictureURL = "";
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        ctxDispatch({
          type: "REMOVE_PICTURE_URL",
        });
        setSuccess("Foto de perfil eliminada con éxito.");
        // Clear the success message after 4 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }
    } catch (error) {
      setPfpDeleting(false);
      setSuccess(null);
      setApiError(
        "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde."
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Cuenta | Artiheal</title>
      </Helmet>
      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">
            Cambiar Foto de Perfil
          </h1>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:gap-5">
            <div className="mr-4 relative">
              <Avatar className="h-20 w-20 min-w-[2.5rem]">
                <AvatarImage
                  src={`${userInfo.pictureURL}`}
                  alt={`${userInfo.firstName}_profile_picture`}
                />
                <AvatarFallback className="bg-primary font-semibold text-background text-xl">
                  {userInfo.firstName.charAt(0)}
                  {userInfo.lastName.charAt(0)}
                </AvatarFallback>
                {userInfo.pictureURL !== "" && !pfpDeleting && (
                  <div
                    className="hidden sm:flex cursor-pointer absolute top-0 left-0 w-full h-full items-center justify-center bg-black bg-opacity-50 transition-opacity hover:opacity-100 opacity-0 text-background text-2xl"
                    onClick={removeProfilePicture}
                  >
                    <Trash2 className="h-8 w-8 text-destructive" />
                  </div>
                )}
              </Avatar>
              {userInfo.pictureURL !== "" && !pfpDeleting && (
                <div className="block sm:hidden cursor-pointer absolute -top-2 -right-2 m-2">
                  <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center">
                    <Trash2
                      className="h-4 w-4 text-background"
                      onClick={removeProfilePicture}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <Label htmlFor="picture" className="text-tertiary">
                  Subir Imagen
                </Label>
                <div className="flex flex-row space-x-2 items-center mt-1">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    name="file"
                    id="picture"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    accept=".jpg, .jpeg, .png, .webp"
                    className="cursor-pointer"
                  />
                  <Button variant="special" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loading />
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-1" strokeWidth={3} />
                        <span>Subir</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="flex flex-row justify-start w-full mt-3 sm:h-[20px]">
                  {apiError && <SignLabel variant="error" message={apiError} />}
                  {success && <SignLabel variant="success" message={success} />}
                  {pfpDeleting && (
                    <SignLabel
                      variant="info"
                      message="Tratando de eliminar tu foto de perfil..."
                    />
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <EditAccountDetailsSection />

      <SettingsSection />

      <DeleteAccountSection handleLogout={handleLogout} />
    </>
  );
};

export default UserAccount;
