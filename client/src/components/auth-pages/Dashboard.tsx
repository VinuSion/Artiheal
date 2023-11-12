import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import CountUp from "react-countup";
import { Separator } from "@ui/separator";
import { Badge } from "@ui/badge";
import AreaGraph from "@/components/ui/area-graph";
import PieChart from "@ui/pie-chart";
import { FoodTypeCount } from "@/lib/constants";
import {
  isHTMLElement,
  getStartOfWeek,
  getStartOfMonth,
  calculateCaloriesForWeek,
  calculateTotalFoodsForWeek,
  calculateDailyCaloriesForWeek,
  countFoodTypesInFoodDiary,
  countMealTypesInFoodDiary,
  getCompletedTasksForMonth,
} from "@/lib/utils";

const Dashboard = () => {
  const profile = JSON.parse(localStorage.getItem("profile")!);

  const [totalCaloriesThisWeek, setTotalCaloriesThisWeek] = useState<number>(0);
  const [foodsConsumedThisWeek, setFoodsConsumedThisWeek] = useState<number>(0);
  const [tasksCompletedLastMonth, setTasksCompletedLastMonth] =
    useState<number>(0);
  const [graphNumbers, setGraphNumbers] = useState<number[]>([]);
  const [pieChartNumbers, setPieChartNumbers] = useState<number[]>([]);
  const [mostPopularFood, setMostPopularFood] = useState<string>("Ninguno");
  const [foodTypeCounts, setFoodTypeCounts] = useState<FoodTypeCount[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      if (profile) {
        const startOfWeek = getStartOfWeek();
        const startOfMonth = getStartOfMonth();
        if (profile.foodDiary.length !== 0) {
          setTotalCaloriesThisWeek(
            calculateCaloriesForWeek(profile.foodDiary, startOfWeek)
          );
          setFoodsConsumedThisWeek(
            calculateTotalFoodsForWeek(profile.foodDiary, startOfWeek)
          );
          setGraphNumbers(
            calculateDailyCaloriesForWeek(profile.foodDiary, startOfWeek)
          );
          const foodTypesList = countFoodTypesInFoodDiary(
            profile.foodDiary,
            startOfWeek
          );
          setMostPopularFood(foodTypesList[0].name);
          setFoodTypeCounts(foodTypesList);
          const mealTypeCounts = countMealTypesInFoodDiary(profile.foodDiary);
          const countsArray = Object.values(mealTypeCounts);
          setPieChartNumbers(countsArray);
        }
        if (profile.taskHistory.length !== 0) {
          setTasksCompletedLastMonth(
            getCompletedTasksForMonth(profile.taskHistory, startOfMonth)
          );
        }
      }
    }
    const exportSVGElement = document.querySelector(
      ".apexcharts-menu-item.exportSVG"
    );
    const exportPNGElement = document.querySelector(
      ".apexcharts-menu-item.exportPNG"
    );
    const exportCSVElement = document.querySelector(
      ".apexcharts-menu-item.exportCSV"
    );

    if (isHTMLElement(exportSVGElement)) {
      exportSVGElement.innerText = "Descargar SVG";
    }

    if (isHTMLElement(exportPNGElement)) {
      exportPNGElement.innerText = "Descargar PNG";
    }

    if (isHTMLElement(exportCSVElement)) {
      exportCSVElement.innerText = "Descargar CSV";
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Dashboard | Artiheal</title>
      </Helmet>
      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">
            Tu Estado Alimenticio
          </h1>

          <div className="rounded-xl bg-background flex flex-col px-2 sm:w-9/12 w-full">
            <div className="mb-2">
              <span className="text-sm sm:text-base">
                Mantente informado sobre tus hábitos alimenticios. Cada vez que
                realices una <strong>acción</strong> en Artiheal, la aplicación
                registrará tus datos para mostrarlos más tarde.
              </span>
              <Separator className="mt-2" />
            </div>
            <div className="flex flex-col 2xl:flex-row justify-between gap-y-5 2xl:gap-y-0 2xl:gap-x-5 my-2">
              <div className="rounded-md border p-4 w-full shadow-md 2xl:w-[35%]">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Calorías esta semana:
                </span>
                <div className="mt-1">
                  <CountUp
                    className="font-bold text-3xl text-primary"
                    start={0}
                    end={totalCaloriesThisWeek}
                    prefix="+"
                    duration={2.5}
                    separator="."
                  />
                  <span className="ml-1 text-sm text-muted-foreground">
                    k/cal
                  </span>
                </div>
              </div>

              <div className="rounded-md border p-4 w-full shadow-md 2xl:w-[35%]">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Esta semana has consumido:
                </span>
                <div className="mt-1">
                  <CountUp
                    className="font-bold text-3xl text-primary"
                    start={0}
                    end={foodsConsumedThisWeek}
                    prefix="+"
                    duration={2.5}
                  />
                  <span className="ml-1 text-sm text-muted-foreground">
                    alimentos
                  </span>
                </div>
              </div>

              <div className="rounded-md border p-4 w-full shadow-md 2xl:w-[35%]">
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Has cumplido en este ultimo mes:
                </span>
                <div className="mt-1">
                  <CountUp
                    className="font-bold text-3xl text-primary"
                    start={0}
                    end={tasksCompletedLastMonth}
                    prefix="+"
                    duration={2.5}
                    separator="."
                  />
                  <span className="ml-1 text-sm text-muted-foreground">
                    tareas
                  </span>
                </div>
              </div>
            </div>

            <div className="my-3 flex flex-col justify-center sm:justify-start items-center border shadow-md rounded-md">
              <span className="ml-2 p-4 justify-self-start place-self-start font-bold text-primary text-md sm:text-2xl">
                Detalle de calorías ganadas esta semana
              </span>
              <div className="mt-5 sm:p-6 sm:mt-0 rounded-md">
                <AreaGraph
                  height={400}
                  width={920}
                  graphData={
                    graphNumbers.length !== 0
                      ? graphNumbers
                      : [0, 0, 0, 0, 0, 0, 0]
                  }
                />
              </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-between gap-y-5 xl:gap-y-0 xl:gap-x-5 my-2">
              {profile && pieChartNumbers.length !== 0 && (
                <div className="rounded-md border p-4 shadow-md w-full xl:w-1/2">
                  <span className="text-xs sm:text-sm text-muted-foreground mb-1">
                    Porcentaje de alimentos consumidos por categoría:
                  </span>
                  <PieChart pieChartData={pieChartNumbers} />
                </div>
              )}
              <div
                className={`rounded-md border p-4 w-full shadow-md ${
                  profile && pieChartNumbers.length !== 0
                    ? "xl:w-1/2"
                    : "w-full"
                }`}
              >
                <span className="text-xs sm:text-sm text-muted-foreground">
                  Alimento más consumido esta semana:
                </span>
                <div className="mt-1 mb-3">
                  <span className="font-bold text-3xl text-primary">
                    {mostPopularFood}
                  </span>
                  {mostPopularFood !== "Ninguno" && (
                    <span className="ml-2 text-sm text-muted-foreground">
                      Cantidad ({foodTypeCounts[0].count})
                    </span>
                  )}
                </div>
                {mostPopularFood !== "Ninguno" && (
                  <>
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      Estos son otros alimentos que consumiste:
                    </span>
                    <div className="mt-3 flex flex-row flex-wrap gap-y-2 w-full">
                      {foodTypeCounts.map(
                        (foodType, index) =>
                          index !== 0 && (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="mr-1 cursor-pointer gap-x-1 px-2"
                            >
                              <span className="flex justify-center rounded-full border border-foreground h-4 w-4">
                                {foodType.count}
                              </span>
                              {foodType.name}
                            </Badge>
                          )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
