import { useEffect, useRef, useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { renderEvents, findTodayInRoutine } from "@/lib/utils";
import { FoodItem, Food } from "@/lib/constants";
import { Badge } from "@ui/badge";
import FoodDiaryForm from "./modules/FoodDiaryForm";
import FoodDiaryHistory from "./modules/FoodDiaryHistory";
import { UtensilsCrossed, GlassWater, Goal } from "lucide-react";
import FullCalendar from "@fullcalendar/react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Axios from "axios";
import { Store } from "@/Store";

const Routine = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialized as true to show loading indicator initially

  const profileString = localStorage.getItem("profile")!;
  const profile = JSON.parse(profileString);
  const storedRoutine = localStorage.getItem("routine");
  const { dispatch: ctxDispatch } = useContext(Store)!;

  const calendarRef = useRef<Calendar | null>(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventDetails, setEventDetails] = useState<string | null>(null);
  const [eventID, setEventID] = useState<string | null>(null);
  const [todaysFoods, setTodaysFoods] = useState<Food[]>([]);

  const today = new Date();

  const getRoutine = async () => {
    try {
      const routineResponse = await Axios.get(
        `/api/routine/${profile.selectedRoutine}`
      );
      const routinePromise = routineResponse.data.daysOfWeek;
      if (routinePromise) {
        ctxDispatch({ type: "CREATE_ROUTINE", payload: routinePromise });
        const routineString = JSON.stringify(routinePromise);
        localStorage.setItem("routine", routineString);
        const calendarApi = calendarRef.current?.getApi();
        try {
          await getTodaysFoods(JSON.parse(routineString));
          renderEvents(calendarApi, routinePromise);
        } catch (err) {
          console.error("Ha ocurrido un error interno en el servidor.", err);
          return;
        }
      }
    } catch (err: any) {
      console.error(
        "La rutina no se pudo encontrar (Error interno del servidor)"
      );
    }
  };

  const getTodaysFoods = async (routine: any) => {
    const today = findTodayInRoutine(routine);
    if (today) {
      const todayObject = routine.find((dayObj: any) => dayObj.day === today);
      const foodsOfToday: Food[] = [];
      try {
        const foodPromises = todayObject.foods.map(async (food: FoodItem) => {
          const foodResponse = await Axios.get(
            `/api/routine/food/${food.foodItemId}`
          );
          if (foodResponse) {
            foodsOfToday.push({
              ...foodResponse.data,
              quantity: food.quantity,
            });
          }
        });

        Promise.all(foodPromises)
          .then(() => {
            ctxDispatch({ type: "ASSIGN_TODAYS_FOODS", payload: foodsOfToday });
            setTodaysFoods(foodsOfToday); // Sets the data when it's available
          })
          .catch((err) => {
            console.error("Ha ocurrido un error interno en el servidor.", err);
          });
      } catch (err) {
        console.error(
          "Ese alimento no se pudo encontrar (Error interno del servidor)",
          err
        );
        throw err;
      }
    }
  };

  const executeAsync = async () => {
    const tasks = [];
    let shouldSetLoading = false;

    if (!storedRoutine) {
      tasks.push(getRoutine()); // If routine is not in localStorage, make the request
      shouldSetLoading = true;
    } else {
      const routine = JSON.parse(storedRoutine);
      if (routine) {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
          tasks.push(renderEvents(calendarApi, routine));
        }
        tasks.push(getTodaysFoods(routine));
        shouldSetLoading = true;
      }
    }

    if (shouldSetLoading) {
      await Promise.all(tasks);
      setIsDataLoaded(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  };

  useEffect(() => {
    executeAsync();
  }, []);

  return (
    <>
      <Helmet>
        <title>Rutina | Artiheal</title>
      </Helmet>
      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">
            Rutina de Nutricion
          </h1>
          <div className="flex flex-col mb-5 2xl:flex-row items-center justify-center gap-3 2xl:items-start 2xl:gap-8 mx-2 2xl:mx-5">
            {isLoading && !isDataLoaded && (
              <div className="rounded-md w-full 2xl:w-[55%]">
                <div className="animate-pulse space-x-4">
                  <div className="space-y-3 py-1">
                    <div className="grid grid-cols-4 gap-16 mb-10">
                      <div className="h-5 bg-slate-300 rounded col-span-2 sm:col-span-1"></div>
                      <div className="h-5 bg-slate-300 rounded col-span-2 sm:col-span-3"></div>
                    </div>
                    <div className="h-[530px] bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            )}
            <div className={`2xl:w-[55%] ${isLoading && !isDataLoaded ? "hidden" : "block"}`}>
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                height={600}
                headerToolbar={{
                  start: "title",
                  center: "",
                  end: "dayGridMonth,dayGridWeek,dayGridDay",
                }}
                views={{
                  dayGridMonth: {
                    buttonText: "Mes",
                  },
                  dayGridWeek: {
                    buttonText: "Semana",
                    dayMaxEventRows: 5,
                  },
                  dayGridDay: {
                    buttonText: "Día",
                    dayMaxEventRows: 10,
                  },
                }}
                titleFormat={{
                  month: "long",
                }}
                locale="es"
                displayEventTime={false}
                dayMaxEventRows={2}
                eventClick={(info: any) => {
                  setEventID(info.event.id);
                  setEventDetails(info.event.title);
                  setIsPopupVisible(true);
                }}
                eventContent={(arg) => {
                  const isSelected = eventID && eventID === arg.event.id;
                  return (
                    <>
                      {isSelected && isPopupVisible && (
                        <div className="absolute z-40 top-[-2rem] cursor-default">
                          <div className="bg-primary text-background text-xs p-2 rounded-lg shadow-md">
                            <span>{eventDetails}</span>
                          </div>
                        </div>
                      )}
                      <button
                        onMouseLeave={() => setIsPopupVisible(false)}
                        type="button"
                        className="px-1 text-sm truncate hover:text-primary transition-all duration-300"
                      >
                        <div className="font-bold text-sm">
                          <div className="flex flex-row gap-1 items-center">
                            <span className="p-1 rounded-full bg-primary"></span>
                            <span className="text-ellipsis overflow-hidden whitespace-nowrap">
                              {arg.event.title || <>&nbsp;</>}
                            </span>
                          </div>
                        </div>
                      </button>
                    </>
                  );
                }}
              />
            </div>
            <div className="w-full h-full 2xl:w-1/4 mt-4 2xl:mt-0 flex flex-col space-y-3 justify-start items-start">
              <div className="flex flex-col h-full justify-between">
                <div className="flex flex-col justify-start space-y-3">
                  <div className="flex flex-row items-center text-primary gap-x-2 mb-2">
                    <Goal className="block sm:hidden h-5 w-5" />
                    <h4 className="text-xl sm:text-3xl font-bold">Metas de Hoy</h4>
                  </div>
                  <p className="text-sm">
                    Para el dia de hoy{" "}
                    <span className="font-bold text-primary">
                      (
                      {today.toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                      )
                    </span>{" "}
                    consume estos alimentos de tu rutina y gana{" "}
                    <span className="text-primary font-bold">+3 puntos!</span>
                    {" "}Sigue tu propio ritmo y obtén recompensas por el esfuerzo
                    que haces para mejorar tu salud!{" "}
                  </p>
                  {isLoading ? (
                    <div className="animate-pulse space-y-3 w-full">
                      <div className="h-16 bg-slate-300 relative rounded">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 p-1 text-sm flex items-center justify-center bg-slate-300 rounded-full border-2 border-background font-bold"></div>
                      </div>
                      <div className="h-16 bg-slate-300 relative rounded">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 p-1 text-sm flex items-center justify-center bg-slate-300 rounded-full border-2 border-background font-bold"></div>
                      </div>
                      <div className="h-16 bg-slate-300 relative rounded">
                        <div className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 p-1 text-sm flex items-center justify-center bg-slate-300 rounded-full border-2 border-background font-bold"></div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 w-full">
                      {todaysFoods.length > 0 ? (
                        todaysFoods.map((food: Food) => {
                          return (
                            <div
                              key={food.foodId}
                              className="flex flex-row items-center px-2 h-16 border rounded shadow-md relative gap-x-3"
                            >
                              <div className="absolute top-0 right-0 -mt-2 -mr-2 h-5 w-5 p-1 text-sm flex items-center justify-center bg-primary rounded-full text-background font-bold">
                                {food.quantity}
                              </div>
                              <div className="h-12 w-12 p-1 rounded">
                                <img src={food.picture} alt={food.name} />
                              </div>
                              <div className="flex flex-col gap-y-1">
                                <div
                                  className={`flex flex-row items-center ${
                                    food.name.length >= 14 &&
                                    food.name.length <= 19
                                      ? "min-[320px]:max-sm:space-x-2 sm:max-2xl:space-x-3 2xl:space-x-2"
                                      : food.name.length > 19
                                      ? "min-[320px]:max-sm:space-x-1 sm:max-2xl:space-x-3 2xl:space-x-1"
                                      : "space-x-3"
                                  }`}
                                >
                                  <span
                                    className={`text-primary font-bold ${
                                      food.name.length >= 14 &&
                                      food.name.length <= 19
                                        ? "min-[320px]:max-sm:text-sm sm:max-2xl:text-basic 2xl:text-sm"
                                        : food.name.length > 19
                                        ? "min-[320px]:max-sm:text-xs sm:max-2xl:text-basic 2xl:text-xs"
                                        : "text-basic"
                                    }`}
                                  >
                                    {food.name}
                                  </span>
                                  <Badge
                                    variant="secondary"
                                    className="text-xs flex flex-row gap-x-1 cursor-pointer"
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
                                <div className="flex flex-row items-center space-x-4">
                                  <span className="text-xs text-muted-foreground">
                                    Calorías: {food.calories}k/cal
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    |
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Porcion: {food.servingSize}{food.foodType === "comida" ? "g" : "mL"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex flex-row items-center px-2 h-16 border rounded shadow-md gap-x-3">
                          <div className="flex flex-col px-2 gap-y-1">
                            <span className="text-primary text-sm font-bold">
                              No tienes metas pendientes...
                            </span>
                            <span className="text-xs text-muted-foreground">
                              Vuelve mañana o completa tu diario.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <FoodDiaryForm />

              </div>
            </div>
          </div>
        </div>
      </div>

      <FoodDiaryHistory />
      
    </>
  );
};

export default Routine;
