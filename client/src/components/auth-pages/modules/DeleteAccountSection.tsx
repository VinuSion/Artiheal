import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import { Button } from "@ui/button";
import Loading from "@ui/loading";
import { UserX, XCircle } from "lucide-react";
import { useToast } from "@ui/use-toast";
import Axios from "axios";

interface DeleteAccountSectionProps {
  handleLogout: () => void;
}

const DeleteAccountSection = ({ handleLogout }: DeleteAccountSectionProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const deleteAccountRequest = async () => {
    setIsDeleting(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo")!);
      if (userInfo) {
        await Axios.delete(`/api/users/delete/${userInfo._id}`);
        toast({
          title: "✅ Cuenta Eliminada",
          description:
            "Tu cuenta se ha eliminado exitosamente. ¡Esperamos verte de nuevo!",
        });
        handleLogout(); // Passes handleLogout to UserAccount component, then to Home and finally App
        navigate("/"); // navigates to landing page after deleting account
      }
      setIsDeleting(false);
    } catch (err: any) {
      console.error(
        "Error al eliminar la cuenta (Error interno del servidor)",
        err
      );
    }
  };

  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center border-2 border-destructive">
        <h1 className="mb-4 text-destructive font-bold text-xl">
          Zona de Peligro
        </h1>
        <div className="flex flex-col items-center gap-3 sm:items-start sm:gap-5 w-full md:w-11/12 lg:w-1/2 mb-2">
          <div className="w-full space-y-5">
            <span className="w-full text-sm text-muted-foreground">
              Si decides eliminar tu cuenta, se borrarán tu perfil de puntos,
              datos de salud y todo el historial relacionado con el diario de
              alimentos y tareas.{" "}
            </span>
            <span className="text-sm font-bold text-destructive">
              Recuerda que no podrás deshacer esta decisión.
            </span>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <UserX className="h-4 w-4 mr-1" strokeWidth={3} />
                  <span>Eliminar Cuenta</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-11/12 sm:w-full max-w-xl rounded-md">
                <DialogHeader>
                  <DialogTitle className="text-left flex flex-row items-center mb-2">
                    <UserX className="h-5 w-5 mr-1" />
                    ¿Estás seguro?
                  </DialogTitle>
                  <DialogDescription className="text-left text-xs xs:text-sm mb-2">
                    Esta acción eliminará tu cuenta de manera irreversible.
                    ¿Seguro que deseas proceder?{" "}
                    <span className="font-bold text-destructive">
                      Esta decision es permanente.
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-row justify-end items-center gap-x-6">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      <XCircle className="h-4 w-4 mr-1" strokeWidth={3} />
                      Cancelar
                    </Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={deleteAccountRequest}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Loading />
                    ) : (
                      <>
                        <UserX className="h-4 w-4 mr-1" strokeWidth={3} />
                        Eliminar{" "}
                        <span className="ml-1 hidden xs:block">Cuenta</span>
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountSection;
