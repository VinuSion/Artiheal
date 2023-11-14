import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Food, FoodEntries, CurrentTask, Task } from "@/lib/constants";
import CountUp from "react-countup";
import { getCurrentDateTimeInEST } from "@/lib/utils";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import { useToast } from "@ui/use-toast";
import Loading from "@ui/loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/dialog";
import SignLabel from "@ui/sign-label";
import {
  Search,
  UtensilsCrossed,
  GlassWater,
  XCircle,
  Frown,
  CalendarPlus,
  PlusCircle,
  Send,
  BookCheck,
  Soup,
} from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Axios from "axios";

const FoodDiaryForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filledInFoodDiary, setFilledInFoodDiary] = useState(false); // Initialized as false to assume diary has not been filled yet

  const profile = JSON.parse(localStorage.getItem("profile")!);
  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const year = currentDate.getFullYear();
  const foodDiaryDate = `${day}-${month}-${year}`;

  const isMounted = useRef(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isCreatingFoodDiary, setIsCreatingFoodDiary] = useState(false);
  const [foods, setFoods] = useState<Food[]>([]); // Initial list of foods
  const [filteredFoods, setFilteredFoods] = useState<Food[]>([]); // Filtered list of foods
  const [searchQuery, setSearchQuery] = useState<string>(""); // Search query
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foodEntries, setFoodEntries] = useState<FoodEntries[]>([]);
  const [previousTotalCalories, setPreviousTotalCalories] = useState<number>(0);
  const [totalCalories, setTotalCalories] = useState<number>(0);

  const { toast } = useToast();

  const foodEntryFormSchema = z.object({
    quantity: z
      .string({
        required_error: "Este campo es requerido.",
      })
      .refine((value) => value.trim() !== "", {
        message: "Este campo es requerido.",
      })
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue > 1;
        },
        { message: "Cantidad debe ser mayor a 1 (g o mL)" }
      )
      .refine(
        (value) => {
          const numberValue = parseFloat(value);
          return numberValue < 999999;
        },
        { message: "Cantidad debe ser menor a 999,999 (g o mL)" }
      )
      .refine(
        (value) => {
          const decimalPlaces = value.split(".")[1];
          return !decimalPlaces || decimalPlaces.length <= 2;
        },
        { message: "Cantidad debe tener maximo 2 decimales." }
      )
      .transform((value) => parseFloat(value)),
    mealType: z.string({
      required_error: "Elije una categoria alimentaria.",
    }),
  });

  type FoodEntryForm = z.infer<typeof foodEntryFormSchema>;

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodEntryForm>({
    resolver: zodResolver(foodEntryFormSchema),
    defaultValues: {
      mealType: "NA",
    },
  });

  const submitFoodEntry = (data: FoodEntryForm) => {
    if (selectedFood) {
      const duplicateEntry = foodEntries.find(
        (entry) => entry.foodID === selectedFood.foodId
      );
      if (duplicateEntry) {
        setError("quantity", {
          type: "manual",
          message: "No puedes agregar el mismo alimento dos veces.",
        });
      } else {
        clearErrors();
        const caloriesConsumed = parseFloat(
          (
            (data.quantity / selectedFood.servingSize) *
            selectedFood.calories
          ).toFixed(0)
        );
        const foodEntry = {
          foodID: selectedFood.foodId,
          name: selectedFood.name,
          quantity: data.quantity,
          mealType: data.mealType,
          caloriesConsumed: caloriesConsumed,
          foodImage: selectedFood.picture,
        };
        setPreviousTotalCalories(totalCalories);
        const newTotalCalories = parseFloat(
          (totalCalories + caloriesConsumed).toFixed(0)
        );

        setFoodEntries((prevFoodEntries) => [...prevFoodEntries, foodEntry]);
        setTotalCalories(newTotalCalories);
        setSelectedFood(null);
        reset();
      }
    }
  };

  const removeFoodEntry = (foodIdToRemove: string) => {
    const updatedFoodEntries = foodEntries.filter(
      (foodEntry) => foodEntry.foodID !== foodIdToRemove
    );
    setPreviousTotalCalories(totalCalories);
    const newTotalCalories = parseFloat(
      updatedFoodEntries
        .reduce((total, entry) => total + entry.caloriesConsumed, 0)
        .toFixed(0)
    );
    setFoodEntries(updatedFoodEntries);
    setTotalCalories(newTotalCalories);
  };

  const createDiary = async () => {
    setIsCreatingFoodDiary(true);
    const todaysFoods = JSON.parse(localStorage.getItem("todaysFoods") || "[]");
    const currentTasks = profile.currentTasks;
    const tasks = JSON.parse(localStorage.getItem("tasks")!);
    const benefitDecision = [];
    const taskInfoArray = [];
    const tasksToUpdate: any = [];

    if (todaysFoods.length > 0) {
      for (const todaysFood of todaysFoods) {
        // Checks if the food is consumed
        const consumed = foodEntries.some(
          (foodEntry) => foodEntry.foodID === todaysFood.foodId
        );

        if (!consumed) {
          benefitDecision.push(false);
        } else {
          // Calculates the expected quantity
          const expectedQuantity = todaysFood.servingSize * todaysFood.quantity;
          // Finds the corresponding food entry
          const matchingFoodEntry = foodEntries.find(
            (entry) => entry.foodID === todaysFood.foodId
          );
          if (matchingFoodEntry) {
            // Checks if the consumed quantity is greater than or equal to the expected quantity
            const deservesBenefit =
              matchingFoodEntry.quantity >= expectedQuantity;
            benefitDecision.push(deservesBenefit);
          }
        }
      }
    }

    for (const task of tasks) {
      const matchingFoodEntry = foodEntries.find(
        (entry) => entry.foodID === task.foodReference
      );
      if (matchingFoodEntry) {
        // If it exists, construct the object and add it to taskInfoArray
        taskInfoArray.push({
          foodID: task.foodReference,
          goal: task.goal,
          quantity: matchingFoodEntry.quantity,
        });

        // Find the corresponding currentTask using the task._id
        const currentTask = currentTasks.find(
          (ctask: any) => ctask.taskId === task._id
        );

        if (currentTask) {
          // Calculate the new progress in grams or milliliters based on the percentage progress
          const calculatedQuantity =
            parseFloat(((currentTask.progress / 100) * task.goal).toFixed(1)) +
            matchingFoodEntry.quantity;

          if (calculatedQuantity >= task.goal) {
            // Updates the properties directly within the currentTask
            currentTask.progress = 100;
            currentTask.status = true;
            currentTask.completedDate = new Date(getCurrentDateTimeInEST());
          } else {
            // Converts the new calculated quantity back to percentage if its still not complete (100%)
            currentTask.progress = parseFloat(
              ((calculatedQuantity / task.goal) * 100).toFixed(2)
            );
          }
          tasksToUpdate.push(currentTask);
        }
      }
    }

    // Check if all benefit decisions are true
    const userDeservesBenefit: boolean =
      benefitDecision.length > 0
        ? benefitDecision.every((decision) => decision)
        : false;

    if (tasksToUpdate.length > 0) {
      const filteredTasks = tasks.filter((task: any) =>
        tasksToUpdate.some(
          (currentTask: any) => currentTask.taskId === task._id
        )
      );
      // AXIOS REQUEST FOR UPDATING CURRENT TASKS
      await updateCurrentTasks(tasksToUpdate, filteredTasks);
    }

    // AXIOS REQUEST FOR SENDING FOOD DIARY
    const diaryDate = getCurrentDateTimeInEST();
    ``;
    await sendFoodDiaryRequest(
      diaryDate,
      foodEntries,
      totalCalories,
      userDeservesBenefit
    ).then(() => {
      // If userDeservesBenefit is true, provide the benefit
      toast({
        title: "✅ Diario enviado exitosamente",
        description: userDeservesBenefit
          ? "¡Por completar tu rutina de hoy, te hemos otorgado 3 puntos! ¡Disfrútalos! 😁"
          : "Aunque no completaste tu rutina hoy, tu diario ha sido enviado con éxito. 🙂",
      });
    });

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const updateCurrentTasks = async (currentTasksToUpdate: any, tasks: any) => {
    try {
      const updatedTasksResponse = await Axios.post(
        `/api/profile/current-tasks/${profile.userId}`,
        {
          currentTasksToUpdate,
          tasks,
        }
      );
      const updatedTasks = updatedTasksResponse.data.updatedTasks;
      const newTaskHistory = updatedTasksResponse.data.taskHistory;
      const levelInfo = updatedTasksResponse.data.levelInfo;
      if (updatedTasks) {
        profile.currentTasks = updatedTasks;
        localStorage.setItem("profile", JSON.stringify(profile));
        await setNewTasks(updatedTasks);
      }
      if (newTaskHistory) {
        profile.taskHistory = newTaskHistory;
        localStorage.setItem("profile", JSON.stringify(profile));
      }
      if (levelInfo && levelInfo.leveledUp) {
        localStorage.setItem("levelUp", levelInfo.level);
      }
    } catch (err: any) {
      console.error(
        "Las tareas no se pudieron actualizar (Error interno del servidor)",
        err
      );
    }
  };

  const setNewTasks = async (currentTasks: any) => {
    const tasks: Task[] = [];
    try {
      const taskPromises = currentTasks.map(async (task: CurrentTask) => {
        const taskResponse = await Axios.get(`/api/tasks/${task.taskId}`);
        if (taskResponse) {
          tasks.push(taskResponse.data);
        }
      });

      Promise.all(taskPromises)
        .then(() => {
          localStorage.setItem("tasks", JSON.stringify(tasks));
        })
        .catch((err) => {
          console.error("Ha ocurrido un error interno en el servidor.", err);
        });
    } catch (err) {
      console.error(
        "Esa tarea no se pudo encontrar (Error interno del servidor)",
        err
      );
      throw err;
    }
  };

  const sendFoodDiaryRequest = async (
    diaryDate: any,
    foodEntries: any,
    calories: any,
    benefit: any
  ) => {
    try {
      const foodDiaryResponse = await Axios.post(
        `/api/profile/food-diary/${profile.userId}`,
        {
          diaryDate,
          foodEntries,
          calories,
          benefit,
        }
      );
      const newFoodDiaryEntry = foodDiaryResponse.data.newDiaryEntry;
      const levelInfo = foodDiaryResponse.data.levelInfo;
      if (newFoodDiaryEntry) {
        profile.foodDiary = profile.foodDiary || [];
        profile.foodDiary.push(newFoodDiaryEntry);
        localStorage.setItem("profile", JSON.stringify(profile));
      }
      if (levelInfo && levelInfo.leveledUp) {
        localStorage.setItem("levelUp", levelInfo.level);
      }
    } catch (err: any) {
      console.error(
        "EL diario alimenticio no se pudo enviar (Error interno del servidor)",
        err
      );
    }
  };

  const getAllFoods = async () => {
    try {
      const foodsResponse = await Axios.get("/api/foods/");
      if (foodsResponse) {
        // sets initial list of foods
        setFoods(foodsResponse.data);
      }
    } catch (err: any) {
      console.error(
        "Los alimentos no se pudieron encontrar (Error interno del servidor)",
        err
      );
    }
  };

  const filterFoods = (query: string) => {
    if (query === "") {
      setFilteredFoods([]); // Clears the filtered foods when the query is empty
      return;
    }
    const filter = foods.filter((food) =>
      food.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFoods(filter);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      const levelUp = localStorage.getItem("levelUp");
      if (levelUp) {
        setTimeout(() => {
          toast({
            title: "🎉¡Enhorabuena!🎉",
            description: `Has avanzado al Nivel ${levelUp}, ¡Felicidades! 🚀`,
          });
          localStorage.removeItem("levelUp");
        }, 250);
      }
      if (profile.foodDiary && profile.foodDiary.length > 0) {
        // Gets the last entry from the foodDiary array
        const lastFoodDiaryEntry =
          profile.foodDiary[profile.foodDiary.length - 1];

        // Gets the date from the last entry
        const entryDate = new Date(lastFoodDiaryEntry.date);
        const today = new Date();

        // Checks if the last entry's date matches today's date
        if (
          entryDate.getDate() === today.getDate() &&
          entryDate.getMonth() === today.getMonth() &&
          entryDate.getFullYear() === today.getFullYear()
        ) {
          setFilledInFoodDiary(true);
        } else {
          setFilledInFoodDiary(false);
          getAllFoods();
        }
      } else {
        getAllFoods();
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col justify-end mt-5 2xl:mt-0">
      <p className="text-xs text-muted-foreground">
        Al completar tu{" "}
        <span className="text-primary font-bold">"Diario Alimenticio"</span>,
        proporcionas datos importantes para evaluar tu progreso en tus tareas y
        el estado de tu salud.{" "}
      </p>
      {isLoading ? (
        <div className="mt-2 animate-pulse space-y-3 w-full">
          <div className="h-16 bg-slate-300 rounded"></div>
        </div>
      ) : (
        <div>
          {filledInFoodDiary ? (
            <div className="mt-2 flex flex-row items-center px-2 h-16 border rounded shadow-md gap-x-3">
              <div className="flex flex-col px-2 gap-y-1">
                <span className="text-primary text-sm font-bold">
                  Ya completastes el diario de hoy
                </span>
                <span className="text-xs text-muted-foreground">
                  ¡Vuelve mañana para completar el otro!
                </span>
              </div>
            </div>
          ) : (
            <div className="mt-2">
              <Dialog>
                <DialogTrigger className="w-full">
                  <div className="w-full inline-flex items-center justify-center rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-violet-400 to-primary hover:from-violet-700 hover:to-primary text-white font-bold shadow-lg transition-transform duration-300 ease-in-out h-10 px-4 py-2">
                    <BookCheck className="h-4 w-4 mr-1" strokeWidth={3} />
                    <span>Llenar el Diario</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-11/12 sm:w-full max-w-2xl rounded-md">
                  <DialogHeader>
                    <DialogTitle className="text-left flex flex-row items-center">
                      <CalendarPlus className="h-4 w-4 mr-1" />
                      Diario Alimenticio
                      <span className="ml-1 font-normal text-muted-foreground text-xs">
                        ({foodDiaryDate})
                      </span>
                    </DialogTitle>
                    <DialogDescription className="text-left text-xs sm:text-sm">
                      Busca los alimentos consumidos hoy utilizando el buscador
                      debajo, agrégalos a la lista y envia el diario. Recuerda
                      que no podrás modificar el diario despues de enviarlo.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-row items-center gap-x-4">
                    <div className="w-full flex flex-col z-50 relative">
                      <Search className="absolute h-6 w-6 text-primary top-2 right-2" strokeWidth={3} />
                      <Input
                        type="text"
                        id="searchFoods"
                        placeholder="Busca alimentos..."
                        autoComplete="off"
                        maxLength={30}
                        value={searchQuery}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const query = e.target.value;
                          setSearchQuery(query);
                          filterFoods(query);
                        }}
                        onFocus={() => setIsInputFocused(true)}
                      />
                      {isInputFocused && searchQuery.trim() !== "" && (
                        <div className="absolute mt-10 w-full bg-background rounded-md border-2 shadow-md max-h-[200px] sm:max-h-[300px] overflow-y-auto">
                          {filteredFoods.length === 0 ? (
                            <div className="flex flex-row items-center px-2 h-16 rounded gap-x-3">
                              <div className="flex flex-col px-2 gap-y-1">
                                <span className="text-primary ns:text-xs xs:text-sm sm:text-base font-bold">
                                  No hay alimentos con esa busqueda...
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ¡Asegurate de incluir las tildes!
                                </span>
                              </div>
                            </div>
                          ) : (
                            filteredFoods.map((food) => {
                              return (
                                <div
                                  key={food.foodId}
                                  onClick={() => {
                                    setSelectedFood(food);
                                    setSearchQuery("");
                                    setIsInputFocused(false);
                                  }}
                                  className="border-b flex flex-row items-center px-2 h-16 gap-x-3 cursor-pointer bg-background hover:bg-muted"
                                >
                                  <div className="h-12 w-12 p-1 rounded">
                                    <img src={food.picture} alt={food.name} />
                                  </div>
                                  <div className="flex flex-col gap-y-1">
                                    <div
                                      className={`flex flex-row items-center ${
                                        food.name.length >= 14 &&
                                        food.name.length <= 19
                                          ? "min-[320px]:max-xs:space-x-2 xs:space-x-3"
                                          : food.name.length > 19
                                          ? "min-[320px]:max-xs:space-x-1 xs:space-x-3"
                                          : "space-x-3"
                                      }`}
                                    >
                                      <span
                                        className={`text-primary font-bold ${
                                          food.name.length >= 14 &&
                                          food.name.length <= 19
                                            ? "min-[320px]:max-sm:text-sm sm:text-base"
                                            : food.name.length > 19
                                            ? "min-[320px]:max-sm:text-xs sm:text-base"
                                            : "text-sm xs:text-base"
                                        }`}
                                      >
                                        {food.name}
                                      </span>
                                      <Badge
                                        variant="secondary"
                                        className="ns:hidden xs:flex flex-row gap-x-1 cursor-pointer"
                                      >
                                        {food.foodType === "comida" ? (
                                          <>
                                            <UtensilsCrossed className="h-3 w-3" />
                                            <span>Comida</span>
                                          </>
                                        ) : (
                                          <>
                                            <GlassWater className="h-3 w-3" />
                                            <span>Bebida</span>
                                          </>
                                        )}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-row items-center ns:space-x-2 xs:space-x-4">
                                      <span className="ns:text-ns xs:text-xs text-muted-foreground">
                                        Calorías:{" "}
                                        {food.calories.toLocaleString("es-CO")}
                                        k/cal
                                      </span>
                                      <span className="ns:text-ns xs:text-xstext-muted-foreground">
                                        |
                                      </span>
                                      <span className="ns:text-ns xs:text-xs text-muted-foreground">
                                        Porcion: {food.servingSize}
                                        {food.foodType === "comida"
                                          ? "g"
                                          : "mL"}
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedFood && (
                    <>
                      <span className="text-primary font-bold sm:text-lg">
                        Alimento Seleccionado
                      </span>
                      <div className="relative flex flex-row items-center px-2 h-16 gap-x-3 bg-background border-2 border-primary rounded-md">
                        <Button
                          size="icon"
                          variant="destructive"
                          className="absolute top-0 right-0 -mt-2 -mr-2 h-6 w-6 sm:top-4 sm:right-2 sm:-mt-0 sm:-mr-0 rounded-full"
                          onClick={() => {
                            setSelectedFood(null);
                          }}
                        >
                          {" "}
                          <XCircle className="h-5 w-5" />
                        </Button>
                        <div className="h-12 w-12 p-1 rounded">
                          <img
                            src={selectedFood.picture}
                            alt={selectedFood.name}
                          />
                        </div>
                        <div className="flex flex-col gap-y-1">
                          <div
                            className={`flex flex-row items-center ${
                              selectedFood.name.length >= 14 &&
                              selectedFood.name.length <= 19
                                ? "min-[320px]:max-sm:space-x-2 sm:space-x-3"
                                : selectedFood.name.length > 19
                                ? "min-[320px]:max-sm:space-x-1 sm:space-x-3"
                                : "space-x-3"
                            }`}
                          >
                            <span
                              className={`text-primary font-bold ${
                                selectedFood.name.length >= 14 &&
                                selectedFood.name.length <= 19
                                  ? "min-[320px]:max-sm:text-sm sm:text-base"
                                  : selectedFood.name.length > 19
                                  ? "min-[320px]:max-sm:text-xs sm:text-base"
                                  : "text-sm xs:text-base"
                              }`}
                            >
                              {selectedFood.name}
                            </span>
                            <Badge
                              variant="secondary"
                              className="flex flex-row items-center gap-x-1 cursor-pointer"
                            >
                              {selectedFood.foodType === "comida" ? (
                                <>
                                  <UtensilsCrossed className="h-3 w-3" />
                                  <span>Comida</span>
                                </>
                              ) : (
                                <>
                                  <GlassWater className="h-3 w-3" />
                                  <span>Bebida</span>
                                </>
                              )}
                            </Badge>
                          </div>
                          <div className="flex flex-row items-center space-x-2 xs:space-x-4">
                            <span className="text-ns xs:text-xs  text-muted-foreground">
                              Calorías: {selectedFood.calories}k/cal
                            </span>
                            <span className="text-ns xs:text-xs  text-muted-foreground">
                              |
                            </span>
                            <span className="text-ns xs:text-xs  text-muted-foreground">
                              Porcion: {selectedFood.servingSize}
                              {selectedFood.foodType === "comida" ? "g" : "mL"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <form
                    className="mt-2"
                    onSubmit={handleSubmit(submitFoodEntry)}
                  >
                    <div className="flex flex-row gap-3.5">
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="quantity"
                          className={`text-tertiary ${
                            !selectedFood
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          Cantidad{" "}
                          {selectedFood
                            ? selectedFood.foodType === "comida"
                              ? "(g)"
                              : "(mL)"
                            : "(g o mL)"}
                        </Label>
                        <Input
                          type="number"
                          id="quantity"
                          min="0"
                          max="999999"
                          step="any"
                          autoComplete="off"
                          placeholder={`Cantidad en ${
                            selectedFood
                              ? selectedFood.foodType === "comida"
                                ? "(g)"
                                : "(mL)"
                              : "(g o mL)"
                          }`}
                          disabled={!selectedFood}
                          {...register("quantity")}
                        />
                      </div>

                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label
                          htmlFor="mealType"
                          className={`text-tertiary ${
                            !selectedFood
                              ? "text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          Categoría
                        </Label>
                        <select
                          id="mealType"
                          disabled={!selectedFood}
                          className="cursor-pointer flex h-10 w-full items-center justify-between border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-lg border-2 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 p-2 transition duration-300 hover:shadow-md focus:shadow-md focus:primary"
                          {...register("mealType")}
                          defaultValue="NA"
                        >
                          <option value="NA">No aplica</option>
                          <option value="breakfast">Desayuno</option>
                          <option value="lunch">Almuerzo</option>
                          <option value="dinner">Cena</option>
                          <option value="snack">Merienda</option>
                        </select>
                      </div>
                    </div>

                    <div className="mt-2 sm:h-[20px] sm:mt-[0.4rem]">
                      {errors.quantity && errors.mealType && (
                        <SignLabel
                          variant="error"
                          message="Ambos campos contienen información inválida."
                        />
                      )}
                      {errors.quantity && !errors.mealType && (
                        <SignLabel
                          variant="error"
                          message={errors.quantity.message}
                        />
                      )}
                      {errors.mealType && !errors.quantity && (
                        <SignLabel
                          variant="error"
                          message={errors.mealType.message}
                        />
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 items-center mt-3">
                      <Button
                        type="submit"
                        disabled={!selectedFood || isSubmitting}
                        className="w-full sm:w-1/2"
                      >
                        <PlusCircle className="h-4 w-4 mr-1" strokeWidth={3} />
                        <span>Agregar Alimento</span>
                      </Button>
                      <p className="text-xs text-muted-foreground sm:w-1/2">
                        Al agregar un alimento a la lista, obtienes datos sobre
                        el número total de calorías consumidas.
                      </p>
                    </div>
                  </form>

                  <Separator />

                  <div className="flex flex-col gap-3">
                    <div className="text-primary font-bold flex flex-row">
                      <Soup className="h-5 w-5 mr-1" />
                      <span>Lista de Alimentos</span>
                    </div>
                    {foodEntries.length > 0 ? (
                      <div className="border rounded grid grid-cols-2 sm:grid-cols-4 gap-10 max-h-24 sm:max-h-60 overflow-y-auto p-4">
                        {foodEntries.map((foodEntry) => {
                          return (
                            <div
                              key={foodEntry.foodID}
                              className="relative flex flex-col items-center w-22 sm:w-28 h-16 bg-background border-2 border-primary rounded-md"
                            >
                              <Button
                                size="icon"
                                variant="destructive"
                                className="absolute top-0 right-0 -mt-2 -mr-2 h-6 w-6 rounded-full"
                                onClick={() =>
                                  removeFoodEntry(foodEntry.foodID)
                                }
                              >
                                {" "}
                                <XCircle className="h-5 w-5" />
                              </Button>
                              <div className="h-10 w-10 p-1 rounded">
                                <img
                                  src={foodEntry.foodImage}
                                  alt={foodEntry.name}
                                />
                              </div>
                              <span className="text-primary text-xs xs:text-sm sm:text-sm font-bold">
                                {foodEntry.caloriesConsumed.toLocaleString(
                                  "es-CO"
                                )}
                                k/cal
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex flex-row items-center px-2 h-16 border rounded gap-x-3">
                        <div className="h-8 w-8 ml-2 rounded items-center justify-center">
                          <Frown className="h-8 w-8 text-primary" />
                        </div>
                        <div className="flex flex-col px-2 gap-y-1">
                          <span className="text-primary ns:text-xs xs:text-sm sm:text-base font-bold">
                            No hay alimentos en la lista...
                          </span>
                          <span className="ns:text-ns xs:text-xs text-muted-foreground">
                            ¡Elije alimentos para guardalos a tu diario!
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="flex flex-row justify-between items-center gap-x-3">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground sm:text-base">
                        Total Calorías:
                      </span>
                      <span
                        className={`flex flex-row font-bold sm:text-lg ${
                          foodEntries.length === 0
                            ? "text-muted-foreground/50"
                            : "text-primary"
                        }`}
                      >
                        <CountUp
                          start={previousTotalCalories}
                          end={totalCalories}
                          duration={1}
                          separator="."
                        />
                        <span className="ml-1">k/cal</span>
                      </span>
                    </div>
                    <Button
                      variant="special"
                      size="lg"
                      className="sm:w-56"
                      disabled={foodEntries.length === 0 || isCreatingFoodDiary}
                      onClick={createDiary}
                    >
                      {isCreatingFoodDiary ? (
                        <Loading />
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-1" strokeWidth={3} />
                          <span className="flex flex-row gap-x-1">
                            Enviar{" "}
                            <span className="hidden xs:block">Diario</span>
                          </span>
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <span className="mt-2 flex text-xs text-muted-foreground">
                Solo puedes llenar el formulario una vez por dia.
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDiaryForm;
