import { useState } from "react";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { Separator } from "@ui/separator";
import RadioButton from "@ui/radio-button";
import Check from "@ui/check";
import SignLabel from "@ui/sign-label";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { months } from "@/lib/constants";
import { Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { getYear, getMonth, format } from "date-fns";
import { es } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import Axios, { AxiosError } from "axios";
import { Range, formatWeekday, isDateValid } from "@/lib/utils";

interface HPFormProps {
  open: boolean;
  onClose: () => void;
}

const HPForm: React.FC<HPFormProps> = ({ open, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [birthdateError, setBirthdateError] = useState<string | null>(null);
  const [selectedDietaryPreference, setSelectedDietaryPreference] =
    useState<string>("none");
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const years = Range(1900, getYear(new Date()));

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    if (checked) {
      setSelectedAllergies([...selectedAllergies, id]);
    } else {
      setSelectedAllergies(selectedAllergies.filter((item) => item !== id));
    }
  };

  const healthProfileFormSchema = z.object({
    height: z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "Este campo es requerido.",
      })
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue > 5;
        },
        { message: "Altura debe ser mayor a 5cm" }
      )
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue < 300;
        },
        { message: "Altura debe ser menor a 300cm" }
      )
      .transform((value) => parseFloat(value)),
    weight: z
      .string()
      .refine((value) => value.trim() !== "", {
        message: "Este campo es requerido.",
      })
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue > 20;
        },
        { message: "Peso debe ser mayor a 20kg" }
      )
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue < 700;
        },
        { message: "Peso debe ser menor a 700kg" }
      )
      .transform((value) => parseFloat(value)),
  });

  type HealthProfileForm = z.infer<typeof healthProfileFormSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HealthProfileForm>({
    resolver: zodResolver(healthProfileFormSchema),
  });

  const submitHealthProfileRequest = (data: HealthProfileForm) => {
    if (isDateValid(selectedDate) === null) {
      setBirthdateError(null);
      console.log(data);
      console.log(format(selectedDate!, "MM/dd/yyyy"));
      console.log(selectedDietaryPreference);
      console.log(selectedAllergies);
      // Handle form submission logic here

      // Close the modal after successful request
      setTimeout(() => {
        onClose();
      }, 1500);
    } else {
      setBirthdateError(isDateValid(selectedDate));
    }
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"></div>

          <div className="fixed left-[50%] top-[50%] z-50 grid max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg w-11/12 sm:w-full rounded-md">
            <div className="flex flex-col sm:text-left">
              <div className="space-y-2 mb-3">
                <span className="text-lg font-semibold leading-none tracking-tight">
                  Crear tu Perfil de Salud
                </span>
                <p className="text-muted-foreground text-left text-xs sm:text-sm">
                  Llena el siguiente formulario para crear tu perfil de salud y
                  posteriormente utilizar la aplicación para que se adapte a tu
                  condición. (Solo tendrás que llenar este formulario una sola
                  vez).
                </p>
              </div>

              <form
                onSubmit={handleSubmit(submitHealthProfileRequest)}
                className="py-2"
              >
                <div className="flex flex-col sm:flex-row gap-3.5 mb-5 sm:mb-0">
                  <div className="flex sm:flex-row gap-3.5 sm:w-8/12">
                    <div className="grid w-full max-w-full items-center gap-2.5">
                      <Label htmlFor="height" className="text-tertiary">
                        Altura (cm)
                      </Label>
                      <Input
                        type="number"
                        id="height"
                        min="5"
                        max="300"
                        autoComplete="off"
                        placeholder="Altura en cm"
                        {...register("height")}
                      />
                      <div className="sm:h-[20px]">
                        {errors.height && (
                          <SignLabel
                            variant="error"
                            message={errors.height.message}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid w-full max-w-full items-center gap-2.5">
                      <Label htmlFor="weight" className="text-tertiary">
                        Peso (kg)
                      </Label>
                      <Input
                        type="number"
                        id="weight"
                        min="20"
                        max="700"
                        autoComplete="off"
                        placeholder="Peso en kg"
                        {...register("weight")}
                      />
                      <div className="sm:h-[20px]">
                        {errors.weight && (
                          <SignLabel
                            variant="error"
                            message={errors.weight.message}
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full sm:w-4/12 max-w-full justify-stretch gap-2.5">
                    <Label htmlFor="birthdate" className="text-tertiary">
                      Fecha de Nacimiento
                    </Label>
                    <DatePicker
                      id="birthdate"
                      renderCustomHeader={({
                        date,
                        changeYear,
                        changeMonth,
                        decreaseMonth,
                        increaseMonth,
                        prevMonthButtonDisabled,
                        nextMonthButtonDisabled,
                      }) => (
                        <div className="m-3 flex justify-center items-center">
                          <Button
                            size="xs"
                            type="button"
                            onClick={decreaseMonth}
                            disabled={prevMonthButtonDisabled}
                          >
                            <ArrowLeft className="h-4" />
                          </Button>

                          <>
                            <select
                              className="p-[5px] rounded-sm mr-1 bg-primary text-background"
                              value={getYear(date)}
                              onChange={({ target: { value } }) =>
                                changeYear(Number(value))
                              }
                            >
                              {years.map((option: number) => (
                                <option
                                  key={option}
                                  value={option}
                                  className={`${
                                    getYear(date) === option
                                      ? "bg-primary text-background"
                                      : "bg-background text-foreground"
                                  }`}
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                            <select
                              className="p-[5px] rounded-sm bg-primary text-background"
                              value={months[getMonth(date)]}
                              onChange={({ target: { value } }) =>
                                changeMonth(months.indexOf(value))
                              }
                            >
                              {months.map((option) => (
                                <option
                                  key={option}
                                  value={option}
                                  className={`${
                                    months[getMonth(date)] === option
                                      ? "bg-primary text-background"
                                      : "bg-background text-foreground"
                                  }`}
                                >
                                  {option}
                                </option>
                              ))}
                            </select>
                          </>

                          <Button
                            size="xs"
                            type="button"
                            onClick={increaseMonth}
                            disabled={nextMonthButtonDisabled}
                          >
                            <ArrowRight className="h-4" />
                          </Button>
                        </div>
                      )}
                      wrapperClassName="h-10"
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      minDate={new Date(1900, 0, 1)}
                      maxDate={new Date()}
                      placeholderText="Elije una fecha"
                      showIcon
                      icon={<Calendar className="mt-1" />}
                      formatWeekDay={formatWeekday}
                      locale={es}
                      autoComplete="off"
                      className="flex h-10 w-full rounded-lg border-2 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:ring-2 focus:primary"
                    />
                    <div className="sm:h-[20px]">
                      {birthdateError && (
                        <SignLabel variant="error" message={birthdateError} />
                      )}
                    </div>
                  </div>
                </div>

                <Separator className="mb-5 sm:mt-5" />

                <div className="flex flex-col sm:flex-row gap-5 mb-5">
                  <div className="grid w-full max-w-full items-center gap-2.5">
                    <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0">
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Preferencias de Dieta
                      </span>
                      <p className="sm:ml-2 text-xs text-muted-foreground">
                        (Elige "Ninguno" si no es aplicable)
                      </p>
                    </div>

                    <div className="grid gap-2">
                      <RadioButton
                        id="none"
                        value="none"
                        checked={selectedDietaryPreference === "none"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedDietaryPreference(e.target.value);
                        }}
                        labelMessage="Ninguno"
                      />
                      <RadioButton
                        id="vegetarian"
                        value="vegetarian"
                        checked={selectedDietaryPreference === "vegetarian"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedDietaryPreference(e.target.value);
                        }}
                        labelMessage="Vegetariano"
                      />
                      <RadioButton
                        id="vegan"
                        value="vegan"
                        checked={selectedDietaryPreference === "vegan"}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedDietaryPreference(e.target.value);
                        }}
                        labelMessage="Vegano"
                      />
                      <RadioButton
                        id="lactoseIntolerant"
                        value="lactoseIntolerant"
                        checked={
                          selectedDietaryPreference === "lactoseIntolerant"
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setSelectedDietaryPreference(e.target.value);
                        }}
                        labelMessage="Sin Lactosa"
                      />
                    </div>
                  </div>

                  <div className="grid w-full max-w-full items-center gap-2.5">
                    <div className="flex flex-col sm:flex-row space-y-1.5 sm:space-y-0">
                      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Alergias
                      </span>
                      <p className="sm:ml-2 text-xs text-muted-foreground">
                        (No seleccionar si no es aplicable)
                      </p>
                    </div>
                    <div className="space-y-1.5" id="allergies">
                      <Check
                        id="driedFruits"
                        onChange={handleCheckboxChange}
                        checked={selectedAllergies.includes("driedFruits")}
                        labelMessage="Frutos secos"
                      />
                      <Check
                        id="lactose"
                        onChange={handleCheckboxChange}
                        checked={selectedAllergies.includes("lactose")}
                        labelMessage="Productos lacteos"
                      />
                      <Check
                        id="gluten"
                        onChange={handleCheckboxChange}
                        checked={selectedAllergies.includes("gluten")}
                        labelMessage="Trigo y gluten"
                      />
                      <Check
                        id="seafood"
                        onChange={handleCheckboxChange}
                        checked={selectedAllergies.includes("seafood")}
                        labelMessage="Mariscos"
                      />
                    </div>
                  </div>
                </div>

                <Button type="submit" variant="special" disabled={isSubmitting}>
                  Crear Perfil
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
