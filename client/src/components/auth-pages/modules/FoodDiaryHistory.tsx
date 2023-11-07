import { useEffect, useState, useRef } from "react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
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
import {
  Gem,
  Info,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Frown,
} from "lucide-react";
import { FoodEntry } from "@/lib/constants";
import { formatSpanishDate, translateMealType } from "@/lib/utils";

const FoodDiaryHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const profile = JSON.parse(localStorage.getItem("profile")!);

  const isMounted = useRef(false);
  const [foodDiaryHistory, setFoodDiaryHistory] = useState<FoodEntry[]>([]);
  const [order, setOrder] = useState("ascending");

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (profile && profile.foodDiary) {
        setFoodDiaryHistory(profile.foodDiary);
      }
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">
          Historial de Diarios
        </h1>
        {isLoading ? (
          <>
            <div className="animate-pulse grid grid-cols-3 items-center gap-5 w-full mb-4 xl:px-32">
              <div className="h-6 bg-slate-300 rounded col-span-2"></div>
              <div className="h-6 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="mt-2 animate-pulse grid grid-cols-1 xl:grid-cols-2 items-center gap-5 w-full mb-2 xl:px-32">
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 sm:gap-5 w-full mb-2 2xl:px-32">
            {foodDiaryHistory.length > 0 ? (
              <>
                <div className="w-full flex flex-row justify-between items-center gap-x-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    Aquí tienes tus diarios. Haz clic en el icono para ver los
                    alimentos consumidos.
                  </span>
                  <div className="flex flex-row space-x-2">
                    <Button
                      className={` ${
                        order === "descending"
                          ? "bg-primary text-background"
                          : "bg-secondary text-secondary-foreground border border-muted-foreground"
                      }`}
                      variant="secondary"
                      size="xs"
                      onClick={() => {
                        setOrder("descending");
                        setFoodDiaryHistory([...foodDiaryHistory].reverse()); // Reverse the array
                      }}
                    >
                      <ArrowDownWideNarrow className="h-4 w-4" />
                    </Button>
                    <Button
                      className={` ${
                        order === "ascending"
                          ? "bg-primary text-background"
                          : "bg-secondary text-secondary-foreground border border-muted-foreground"
                      }`}
                      variant="secondary"
                      size="xs"
                      onClick={() => {
                        setOrder("ascending");
                        setFoodDiaryHistory([...foodDiaryHistory].reverse());
                      }}
                    >
                      <ArrowUpWideNarrow className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div
                  className={`grid grid-cols-1 ${
                    foodDiaryHistory.length === 1
                      ? "xl:grid-cols-1"
                      : "xl:grid-cols-2"
                  } gap-5`}
                >
                  {foodDiaryHistory.map((entry, index) => (
                    <div
                      className="flex flex-row items-center justify-between p-3 border rounded shadow-md"
                      key={index}
                    >
                      <div className="flex flex-col gap-y-1">
                        <div className="flex flex-row items-center gap-x-3">
                          <span className="text-primary text-sm sm:text-base font-bold">
                            {formatSpanishDate(entry.date)}
                          </span>
                        </div>
                        <div className="flex flex-row items-center space-x-2">
                          <span className="text-xs text-muted-foreground">
                            Total Calorias:{" "}
                            {entry.totalCalories.toLocaleString("es-CO")} k/cal
                          </span>
                          {entry.threePointsBenefit && (
                            <Badge
                              variant="special"
                              className="text-xs flex flex-row gap-x-1 cursor-pointer"
                            >
                              <Gem className="h-3 w-3" />
                              <div className="flex flex-row">
                                +3{" "}
                                <span className="hidden sm:block ml-1">
                                  puntos
                                </span>
                              </div>
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="ml-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="special">
                              <Info className="h-5 w-5" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-11/12 sm:w-full max-w-xl rounded-md">
                            <DialogHeader>
                              <DialogTitle className="text-left flex flex-row items-center mb-2">
                                {formatSpanishDate(entry.date)}
                              </DialogTitle>
                              <DialogDescription className="text-left text-xs sm:text-sm mb-2">
                                En este dia, consumiste {entry.foods.length}{" "}
                                {entry.foods.length === 1
                                  ? "alimento"
                                  : "alimentos"}
                                . Debajo podras ver la lista de{" "}
                                {entry.foods.length === 1 ? "este" : "ellos"} en
                                mas detalle.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mb-2">
                              {entry.threePointsBenefit ? (
                                <Badge
                                  variant="special"
                                  className="text-xs flex flex-row gap-x-1"
                                >
                                  <Gem className="h-3 w-3" />
                                  <span className="flex flex-row">
                                    Cumplistes este dia, ganastes +3 puntos
                                  </span>
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs flex flex-row gap-x-1"
                                >
                                  <Frown className="h-3 w-3" />
                                  <span className="flex flex-row">
                                    No cumplistes con tu rutina...
                                  </span>
                                </Badge>
                              )}
                            </div>
                            <div className="border rounded space-y-3 w-full gap-10 max-h-72 overflow-y-auto p-2">
                              {entry.foods.map((foodEntry) => {
                                return (
                                  <div
                                    key={foodEntry.foodID}
                                    className="flex flex-row items-center px-2 h-16 border rounded shadow-md gap-x-3"
                                  >
                                    <div className="h-12 w-12 p-1 rounded">
                                      <img
                                        src={foodEntry.foodImage}
                                        alt={foodEntry.name}
                                      />
                                    </div>
                                    <div className="flex flex-col gap-y-1">
                                      <div
                                        className={`flex flex-row items-center ${
                                          foodEntry.name.length >= 14 &&
                                          foodEntry.name.length <= 19
                                            ? "min-[320px]:max-sm:space-x-2 sm:max-2xl:space-x-3 2xl:space-x-3"
                                            : foodEntry.name.length > 19
                                            ? "min-[320px]:max-sm:space-x-1 sm:max-2xl:space-x-3 2xl:space-x-3"
                                            : "space-x-3"
                                        }`}
                                      >
                                        <span
                                          className={`text-primary font-bold ${
                                            foodEntry.name.length >= 14 &&
                                            foodEntry.name.length <= 19
                                              ? "min-[320px]:max-sm:text-sm sm:max-2xl:text-basic"
                                              : foodEntry.name.length > 19
                                              ? "min-[320px]:max-sm:text-xs sm:max-2xl:text-basic"
                                              : "text-basic"
                                          }`}
                                        >
                                          {foodEntry.name}
                                        </span>
                                        <Badge
                                          variant="secondary"
                                          className="text-xs flex flex-row gap-x-1 cursor-pointer"
                                        >
                                          <span>
                                            {translateMealType(
                                              foodEntry.mealType as string
                                            )}
                                          </span>
                                        </Badge>
                                      </div>
                                      <div className="flex flex-row items-center space-x-4">
                                        <span className="text-xs text-muted-foreground">
                                          {foodEntry.caloriesConsumed.toLocaleString(
                                            "es-CO"
                                          )}{" "}
                                          k/cal
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          |
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                          {foodEntry.quantity} (g o mL)
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                            <DialogFooter className="flex flex-row justify-between sm:justify-between items-center">
                              <div className="flex flex-col justify-start">
                                <span className="text-sm text-muted-foreground sm:text-basic">
                                  Total Calorias:
                                </span>
                                <span className="font-bold sm:text-lg text-primary">
                                  {entry.totalCalories.toLocaleString("es-CO")}{" "}
                                  k/cal
                                </span>
                              </div>
                              <DialogClose asChild>
                                <Button type="button" size="lg">
                                  Cerrar
                                </Button>
                              </DialogClose>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center px-3">
                <div className="flex flex-col">
                  <span className="text-primary font-bold text-base sm:text-xl">
                    No tienes diarios todavía...
                  </span>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    ¡Anímate a completar el diario alimentario y llevar un
                    registro del progreso en tu rutina!
                  </span>
                </div>
                <div className="my-5 flex justify-center">
                  <img
                    className="sm:w-1/2"
                    src="https://github.com/VinuSion/Artiheal/assets/56313573/7b2cca5c-866c-4dee-bf79-0ce8350939bd"
                    alt="No_Diary_Entries"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDiaryHistory;
