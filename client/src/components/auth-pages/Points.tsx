import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
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
import { Gem, ClipboardList, Sparkle } from "lucide-react";
import { Badge } from "@ui/badge";
import { Separator } from "@ui/separator";
import CircularProgressBar from "@ui/circular-progress";
import TaskHistorySection from "./modules/TaskHistorySection";
import RedeemPromotions from "./modules/RedeemPromotions";
import { getPointsRangeFromLevel, formatISOToMonthDay } from "@/lib/utils";
import {
  PointsProfile,
  PendingTask,
  CurrentTask,
  levelBenefitsInfo,
} from "@/lib/constants";
import Axios from "axios";

const Points = () => {
  const [isLoading, setIsLoading] = useState(true);

  const profile = JSON.parse(localStorage.getItem("profile")!);
  const tasks = JSON.parse(localStorage.getItem("tasks")!);
  const isMounted = useRef(false);
  const [pointsProfile, setPointsProfile] = useState<PointsProfile | null>(
    null
  );
  const [pendingTasks, setPendingTasks] = useState<PendingTask[]>([]);
  const [pointsProgress, setPointsProgress] = useState<number>(0);

  const getPointsProfile = async () => {
    try {
      const pointsProfileResponse = await Axios.get(
        `/api/points-profile/${profile.userId}`
      );
      if (pointsProfileResponse) {
        setPointsProfile(pointsProfileResponse.data);
        const { min, max } = getPointsRangeFromLevel(
          pointsProfileResponse.data.level
        );
        if (pointsProfileResponse.data.level === 4) {
          setPointsProgress(100);
        } else {
          setPointsProgress(
            Math.floor(
              ((pointsProfileResponse.data.earnedPoints - min) / (max - min)) *
                100
            )
          );
        }
      }
    } catch (err: any) {
      console.error(
        "El perfil de puntos no se pudo encontrar (Error interno del servidor)"
      );
    }
  };

  const setCurrentTasks = () => {
    const pendingTasks: any = [];

    profile.currentTasks.forEach((currentTask: CurrentTask) => {
      const matchingTask = tasks.find(
        (task: any) => task._id === currentTask.taskId
      );

      // Combines the data from profile.currentTasks and tasks
      if (matchingTask) {
        const combinedTask = {
          description: matchingTask.description,
          goal: matchingTask.goal,
          pointsAwarded: matchingTask.pointsAwarded,
          ...currentTask,
        };
        pendingTasks.push(combinedTask);
      }
    });
    // Sets the joined information to the state
    setPendingTasks(pendingTasks);
  };

  const executeAsync = async () => {
    await getPointsProfile();
    setCurrentTasks();
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      executeAsync();
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Tus Puntos | Artiheal</title>
      </Helmet>
      <div className="flex flex-row justify-center mb-6">
        <div className="rounded-xl bg-background w-full sm:w-9/12 p-4 flex flex-col shadow-xl items-center">
          <h1 className="mb-4 text-tertiary font-bold text-xl">Tus Puntos</h1>

          <div className="rounded-xl bg-background flex flex-col px-2 sm:w-9/12">
            <div className="mb-5 w-full">
              <span className="text-sm sm:text-base">
                Revisa tus puntos y conviértelos en{" "}
                <strong>
                  productos y servicios asombrosos de marcas asociadas.
                </strong>{" "}
                Para ver los beneficios de cada nivel, haz clic{" "}
                <Dialog>
                  <DialogTrigger asChild>
                    <span className="cursor-pointer hover:underline text-primary font-semibold">
                      aquí
                    </span>
                  </DialogTrigger>
                  <DialogContent className="w-11/12 sm:w-full max-w-xl rounded-md">
                    <DialogHeader>
                      <DialogTitle className="text-left flex flex-row items-center mb-2">
                        Descubre los beneficios
                      </DialogTitle>
                      <DialogDescription className="text-left text-xs sm:text-sm mb-2">
                        A continuación, encontrarás los beneficios detallados
                        para cada nivel y el rango de puntos correspondiente.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="border rounded space-y-3 w-full gap-10 p-2">
                      {levelBenefitsInfo.map((level, index) => (
                        <div
                          className={`flex flex-col justify-between py-2 px-4 h-18 border rounded shadow-md w-full ${
                            level.lvl === 4
                              ? "bg-gradient-to-r from-primary via-purple-400 to-violet-300 text-background border-violet-400"
                              : "bg-background text-foreground"
                          } ${
                            pointsProfile?.level === level.lvl
                              ? "border-primary border-2"
                              : ""
                          }`}
                          key={index}
                        >
                          <div className="flex flex-row items-center space-x-1.5">
                            <Sparkle className="h-4 w-4" />
                            <span className="font-bold">{level.title}</span>
                            <Badge
                              variant={`${
                                level.lvl === 4 ? "special" : "secondary"
                              }`}
                              className="text-xs flex flex-row gap-x-1 cursor-pointer"
                            >
                              {level.range}
                            </Badge>
                          </div>
                          <span
                            className={`text-xs sm:text-sm ${
                              level.lvl === 4
                                ? "text-background"
                                : "text-muted-foreground"
                            }`}
                          >
                            {level.description}
                          </span>
                        </div>
                      ))}
                    </div>
                    <DialogFooter className="flex flex-row justify-between sm:justify-between items-center gap-x-6">
                      <span className="justify-start self-start text-xs text-muted-foreground">
                        Los puntos conseguidos mediante tareas expiradas no
                        serán multiplicados.
                      </span>
                      <DialogClose asChild>
                        <Button type="button" size="lg">
                          Cerrar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                .
              </span>
            </div>

            {isLoading ? (
              <div className="animate-pulse 2xl:grid 2xl:grid-cols-2 sm:gap-x-5 mb-3">
                <div className="flex flex-col border p-4 rounded-md mb-6 2xl:mb-0">
                  <div className="h-4 w-full mt-2 mb-6 bg-slate-300 rounded"></div>
                  <div className="flex flex-row gap-x-4">
                    <div className="rounded-full bg-slate-300 h-24 w-24"></div>
                    <div className="flex-1 space-y-6 py-1">
                      <div className="h-4 w-3/4 bg-slate-300 rounded"></div>
                      <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                        </div>
                        <div className="h-4 bg-slate-300 rounded"></div>
                      </div>
                    </div>
                  </div>
                  <Separator className="my-5" />
                  <div className="h-4 w-full bg-slate-300 rounded"></div>
                </div>

                <div className="space-x-4">
                  <div className="space-y-3">
                    <div className="grid grid-cols-4 gap-5 mb-3">
                      <div className="h-4 bg-slate-300 rounded col-span-2 sm:col-span-3"></div>
                    </div>
                    <div className="h-20 xl:h-[70px] bg-slate-300 rounded"></div>
                    <div className="h-20 xl:h-[70px] bg-slate-300 rounded"></div>
                    <div className="h-20 xl:h-[70px] bg-slate-300 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col 2xl:flex-row gap-y-3 sm:gap-x-5 mb-3">
                <div className="border p-4 rounded-md shadow-md">
                  <div className="flex flex-row space-x-2 items-center">
                    <Gem className="h-5 w-5 text-primary" />
                    <span className="font-bold text-xl text-primary">
                      Resumen de tus puntos
                    </span>
                  </div>
                  <div className="flex flex-row">
                    <div className="flex flex-row items-center">
                      <div className="mr-3">
                        <CircularProgressBar
                          percentage={pointsProgress}
                          height={160}
                          gradientEnabled
                          showLabel
                        />
                      </div>

                      <div className="flex flex-col gap-y-3">
                        <span className="font-bold sm:text-lg">
                          Te encuentras en el Nivel {pointsProfile?.level}
                        </span>
                        <span>
                          <span className="font-semibold text-sm sm:text-base">
                            Acumulados: {pointsProfile?.earnedPoints}
                          </span>
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Para subir al siguiente nivel, necesitas{" "}
                          {pointsProfile?.nextLevelPoints}{" "}
                          {pointsProfile?.nextLevelPoints === 1
                            ? "punto"
                            : "puntos"}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex flex-row space-x-2 items-center mt-2">
                    <span className="flex text-xs text-muted-foreground/80">
                      Recuerda que tanto tu nivel como tus puntos disminuyen al
                      momento de redimirlos.
                    </span>
                  </div>
                </div>

                <div className="2xl:w-[59%] flex flex-col items-start gap-y-2 mt-3 sm:mt-0">
                  <div className="flex flex-row space-x-2 items-center">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <span className="text-primary font-bold">
                      Tareas Pendientes
                    </span>
                  </div>
                  {pendingTasks.length > 0 &&
                    pendingTasks.map((task: PendingTask, index) => (
                      <div
                        className="flex flex-row h-20 items-center justify-between px-2 xl:h-[70px] border rounded shadow-md mt-2 2xl:mt-0 gap-x-3 w-full"
                        key={index}
                      >
                        <div className="flex flex-row items-center space-x-3">
                          <div>
                            <CircularProgressBar
                              percentage={Number(task.progress.toFixed(0))}
                              circleSize="45%"
                              valueFontSize="13px"
                              gradientEnabled
                              width={60}
                              height={108}
                            />
                          </div>

                          <div className="flex flex-col gap-y-1">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger className="flex text-left">
                                  <span className="text-primary font-bold text-xs sm:text-sm">
                                    {task.description.length > 30
                                      ? `${task.description.substring(
                                          0,
                                          30
                                        )}...`
                                      : task.description}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <span className="text-xs sm:text-sm">
                                    {task.description}
                                  </span>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <span className="text-muted-foreground text-xs sm:text-sm">
                              <span className="font-semibold">Inicio:</span>{" "}
                              {formatISOToMonthDay(String(task.initialDate))} -{" "}
                              <span className="font-semibold">Vence:</span>{" "}
                              {formatISOToMonthDay(String(task.dueDate))}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-y-1 mr-2">
                          <Badge
                            variant="special"
                            className="text-xs flex flex-row gap-x-1 cursor-pointer sm:mt-1 w-fit self-end"
                          >
                            <>
                              <Gem className="h-3 w-3" />
                              <div className="flex flex-row">
                                +{task.pointsAwarded}{" "}
                                <span className="hidden lg:block ml-1">
                                  Puntos
                                </span>
                              </div>
                            </>
                          </Badge>
                          <div className="hidden lg:block">
                            <span className="text-sm text-muted-foreground">
                              <span className="font-semibold">Meta:</span> (
                              {Math.floor((task.progress / 100) * task.goal)}/
                              <span className="text-primary font-semibold">
                                {task.goal}
                              </span>
                              )
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <TaskHistorySection />

      <RedeemPromotions />
    </div>
  );
};

export default Points;
