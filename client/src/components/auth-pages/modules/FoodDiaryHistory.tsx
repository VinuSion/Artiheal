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
  ChevronDown,
  ChevronUp,
  CalendarClock,
  XCircle,
} from "lucide-react";
import { FoodEntry } from "@/lib/constants";
import { formatSpanishDate, translateMealType } from "@/lib/utils";

const FoodDiaryHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const profile = JSON.parse(localStorage.getItem("profile")!);

  const isMounted = useRef(false);
  const [foodDiaryHistory, setFoodDiaryHistory] = useState<FoodEntry[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<FoodEntry[]>([]);
  const [order, setOrder] = useState("ascending");
  const [expanded, setExpanded] = useState(false);

  const toggleOrder = (newOrder: string) => {
    if (order !== newOrder) {
      setOrder(newOrder);
      const reversedEntries = [...foodDiaryHistory].reverse();

      if (foodDiaryHistory.length > 6) {
        setVisibleEntries(
          visibleEntries.length === 6
            ? reversedEntries.slice(0, 6)
            : reversedEntries
        );
        setFoodDiaryHistory(reversedEntries);
      } else {
        setVisibleEntries(reversedEntries);
        setFoodDiaryHistory(reversedEntries);
      }
    }
  };

  const toggleExpansion = () => {
    setExpanded((prevExpanded) => {
      const newVisibleEntries = prevExpanded
        ? foodDiaryHistory.slice(0, 6)
        : [...foodDiaryHistory];
      setVisibleEntries(newVisibleEntries);
      return !prevExpanded;
    });
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (profile && profile.foodDiary) {
        setFoodDiaryHistory(profile.foodDiary);
        if (profile.foodDiary.length > 6) {
          setVisibleEntries(
            expanded ? profile.foodDiary : profile.foodDiary.slice(0, 6)
          );
        } else {
          setVisibleEntries(profile.foodDiary);
        }
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
            <div className="animate-pulse grid grid-cols-3 px-2 items-center gap-5 w-full mb-4 2xl:px-32">
              <div className="h-6 bg-slate-300 rounded col-span-2"></div>
              <div className="h-6 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="mt-2 animate-pulse grid grid-cols-1 px-2 xl:grid-cols-2 items-center gap-5 w-full mb-2 xl:px-32">
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
              <div className="h-[74px] bg-slate-300 rounded"></div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 px-2 sm:gap-5 w-full mb-2 2xl:px-32">
            {foodDiaryHistory.length > 0 ? (
              <div
                className={`relative space-y-5 ${expanded ? "mb-7" : "mb-2"}`}
              >
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
                      onClick={() => toggleOrder("descending")}
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
                      onClick={() => toggleOrder("ascending")}
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
                  } gap-x-5 gap-y-4 xl:gap-5`}
                >
                  {visibleEntries.map((entry, index) => (
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
                            Total Calorías:{" "}
                            {entry.totalCalories.toLocaleString("es-CO")} k/cal
                          </span>
                          <Badge
                            variant={`${
                              entry.threePointsBenefit ? "special" : "secondary"
                            }`}
                            className="hidden text-xs xs:flex flex-row gap-x-1 cursor-pointer"
                          >
                            {entry.threePointsBenefit ? (
                              <>
                                <Gem className="h-3 w-3" />
                                <div className="flex flex-row">
                                  +3{" "}
                                  <span className="hidden sm:block ml-1">
                                    puntos
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <Frown className="h-3 w-3" />
                                <span>N/C</span>
                              </>
                            )}
                          </Badge>
                        </div>
                      </div>
                      <div className="ml-3">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="special">
                              <Info className="h-5 w-5" strokeWidth={3} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="w-11/12 sm:w-full max-w-xl rounded-md">
                            <DialogHeader>
                              <DialogTitle className="leading-normal text-left flex flex-row items-center mb-2">
                              <CalendarClock className="h-4 w-4 mr-1 hidden sm:block" />
                                {formatSpanishDate(entry.date)}
                              </DialogTitle>
                              <DialogDescription className="text-left text-xs sm:text-sm mb-2">
                                En este dia, consumiste{" "}
                                {entry.foods.length === 1
                                  ? "un solo alimento"
                                  : `${entry.foods.length} alimentos`}
                                . En la parte inferior podrás ver los detalles
                                de {entry.foods.length === 1 ? "este" : "ellos"}
                                .
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
                                    Al cumplir tu rutina ganaste +3 puntos.
                                  </span>
                                </Badge>
                              ) : (
                                <Badge
                                  variant="outline"
                                  className="text-xs flex flex-row gap-x-1"
                                >
                                  <Frown className="h-3 w-3" />
                                  <span className="flex flex-row">
                                    No cumpliste con tu rutina.
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
                                            ? "min-[320px]:max-xs:space-x-2 xs:space-x-3"
                                            : foodEntry.name.length > 19
                                            ? "min-[320px]:max-xs:space-x-1 xs:space-x-3"
                                            : "space-x-3"
                                        }`}
                                      >
                                        <span
                                          className={`text-primary font-bold ${
                                            foodEntry.name.length >= 14 &&
                                            foodEntry.name.length <= 19
                                              ? "min-[320px]:max-sm:text-sm sm:text-base"
                                              : foodEntry.name.length > 19
                                              ? "min-[320px]:max-sm:text-xs sm:text-base"
                                              : "text-sm xs:text-base"
                                          }`}
                                        >
                                          {foodEntry.name}
                                        </span>
                                        <Badge
                                          variant="secondary"
                                          className="text-ns xs:text-xs flex flex-row gap-x-1 cursor-pointer"
                                        >
                                          <span>
                                            {translateMealType(
                                              foodEntry.mealType as string
                                            )}
                                          </span>
                                        </Badge>
                                      </div>
                                      <div className="flex flex-row items-center space-x-2 xs:space-x-4">
                                        <span className="text-ns xs:text-xs text-muted-foreground">
                                          {foodEntry.caloriesConsumed.toLocaleString(
                                            "es-CO"
                                          )}{" "}
                                          k/cal
                                        </span>
                                        <span className="text-ns xs:text-xs text-muted-foreground">
                                          |
                                        </span>
                                        <span className="text-ns xs:text-xs text-muted-foreground">
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
                                  Total Calorías:
                                </span>
                                <span className="font-bold sm:text-lg text-primary">
                                  {entry.totalCalories.toLocaleString("es-CO")}{" "}
                                  k/cal
                                </span>
                              </div>
                              <DialogClose asChild>
                                <Button type="button" size="lg">
                                  <XCircle className="h-4 w-4 mr-1" strokeWidth={3} />
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

                {foodDiaryHistory.length > 6 && !expanded && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b h-40 sm:h-20 from-transparent to-background pointer-events-none" />
                )}

                {foodDiaryHistory.length > 6 && (
                  <div
                    className={`absolute ${
                      expanded ? "-bottom-9" : "-bottom-3"
                    } left-1/2 transform -translate-x-1/2`}
                  >
                    <Badge
                      variant="outline"
                      className="text-xs flex flex-row gap-x-1 cursor-pointer"
                      onClick={toggleExpansion}
                    >
                      {expanded ? (
                        <ChevronUp className="h-3 w-3" />
                      ) : (
                        <ChevronDown className="h-3 w-3" />
                      )}
                      <span>{expanded ? "Ver menos" : "Ver mas"}</span>
                    </Badge>
                  </div>
                )}
              </div>
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
                    alt="no_diary_entries"
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
