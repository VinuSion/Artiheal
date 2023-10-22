import React from "react";
import { Button } from "@ui/button";

interface HPFormProps {
  open: boolean;
  onClose: () => void;
}

const HPForm: React.FC<HPFormProps> = ({ open, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here

    // Close the modal after successful submission
    onClose();
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>

          <div className="fixed left-[50%] top-[50%] z-50 grid max-w-3xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-11/12 sm:w-full rounded-md">
            <div className="flex flex-col text-center sm:text-left">
              <div className="space-y-2 mb-3">
                <span className="text-lg font-semibold leading-none tracking-tight text-left">
                  Crear tu Perfil de Salud
                </span>
                <p className="text-muted-foreground text-left text-xs sm:text-sm">
                  Llena el siguiente formulario para crear tu perfil de salud y
                  posteriormente utilizar la aplicación para que se adapte a tu
                  condición. (Solo tendrás que llenar este formulario una sola
                  vez).
                </p>
              </div>

              <form onSubmit={handleSubmit} className="py-2">
                {/* Your form fields here */}
                <Button type="submit" variant="special">
                  Cerrar (por ahora)
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HPForm;
