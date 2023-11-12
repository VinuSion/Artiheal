import { useEffect, useState, useRef } from "react";
import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import {
  Gem,
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  CheckCircle,
  CircleOff,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { TaskHistory, TaskHistoryEntry } from "@/lib/constants";
import { formatCompletedDate } from "@/lib/utils";
import Axios from "axios";

const TaskHistorySection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const profile = JSON.parse(localStorage.getItem("profile")!);

  const isMounted = useRef(false);
  const [taskHistoryEntries, setTaskHistoryEntries] = useState<
    TaskHistoryEntry[]
  >([]);
  const [visibleEntries, setVisibleEntries] = useState<TaskHistoryEntry[]>([]);
  const [order, setOrder] = useState("ascending");
  const [expanded, setExpanded] = useState(false);

  const setTaskHistory = async () => {
    const taskHistory: TaskHistoryEntry[] = [];
    try {
      const taskPromises = profile.taskHistory.map(
        async (task: TaskHistory) => {
          const taskResponse = await Axios.get(`/api/tasks/${task.taskId}`);
          if (taskResponse) {
            const taskHistoryEntry = {
              taskId: task.taskId,
              description: taskResponse.data.description,
              pointsReceived: task.pointsReceived,
              progress: task.progress,
              goal: taskResponse.data.goal,
              completedDate: task.completedDate,
              completedOnTime: task.completedOnTime,
            };
            taskHistory.push(taskHistoryEntry);
          }
        }
      );

      Promise.all(taskPromises)
        .then(() => {
          taskHistory.sort(
            (a, b) =>
              new Date(a.completedDate).getTime() -
              new Date(b.completedDate).getTime()
          );
          setTaskHistoryEntries(taskHistory);
          if (taskHistory.length > 6) {
            setVisibleEntries(expanded ? taskHistory : taskHistory.slice(0, 6));
          } else {
            setVisibleEntries(taskHistory);
          }
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Ha ocurrido un error interno en el servidor.", err);
        });
    } catch (err: any) {
      console.error(
        "La tarea no se pudo encontrar (Error interno del servidor)"
      );
    }
  };

  const toggleOrder = (newOrder: string) => {
    if (order !== newOrder) {
      setOrder(newOrder);
      const reversedEntries = [...taskHistoryEntries].reverse();

      if (taskHistoryEntries.length > 6) {
        setVisibleEntries(
          visibleEntries.length === 6
            ? reversedEntries.slice(0, 6)
            : reversedEntries
        );
        setTaskHistoryEntries(reversedEntries);
      } else {
        setVisibleEntries(reversedEntries);
        setTaskHistoryEntries(reversedEntries);
      }
    }
  };

  const toggleExpansion = () => {
    setExpanded((prevExpanded) => {
      const newVisibleEntries = prevExpanded
        ? taskHistoryEntries.slice(0, 6)
        : [...taskHistoryEntries];
      setVisibleEntries(newVisibleEntries);
      return !prevExpanded;
    });
  };

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      setTaskHistory();
    }
  }, []);

  return (
    <div className="flex flex-row justify-center mb-6">
      <div className="rounded-xl bg-background shadow-xl w-full sm:w-9/12 p-4 flex flex-col items-center">
        <h1 className="mb-4 text-tertiary font-bold text-xl">
          Historial de Tareas
        </h1>
        {isLoading ? (
          <>
            <div className="animate-pulse grid grid-cols-3 px-2 items-center gap-5 w-full mb-4 2xl:px-44">
              <div className="h-6 bg-slate-300 rounded col-span-2"></div>
              <div className="h-6 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="mt-2 animate-pulse grid grid-cols-1 px-2 xl:grid-cols-2 items-center gap-5 w-full mb-2 2xl:px-44">
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
              <div className="h-20 bg-slate-300 rounded"></div>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 px-2 sm:gap-5 w-full mb-2 2xl:px-44">
            {taskHistoryEntries.length > 0 ? (
              <div
                className={`relative space-y-5 ${expanded ? "mb-7" : "mb-2"}`}
              >
                <div className="w-full flex flex-row justify-between items-center gap-x-4">
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    A continuación, encontrarás el registro histórico de tus
                    tareas, podrás ver tanto las completadas como las expiradas.
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
                    taskHistoryEntries.length === 1
                      ? "xl:grid-cols-1"
                      : "xl:grid-cols-2"
                  } gap-x-5 gap-y-4 xl:gap-5`}
                >
                  {visibleEntries.map((entry, index) => (
                    <div
                      className="flex flex-row h-20 items-center justify-between p-3 border rounded shadow-md"
                      key={index}
                    >
                      <div className="flex flex-col gap-y-1">
                        <div className="flex flex-row items-center gap-x-3">
                          <div
                            className={`flex flex-row items-center gap-x-1 text-sm sm:text-base font-bold ${
                              entry.completedOnTime
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          >
                            {entry.completedOnTime ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <CircleOff className="h-4 w-4" />
                            )}
                            <span className="hidden sm:block">
                              {entry.completedOnTime
                                ? "Completada:"
                                : "Vencida:"}
                            </span>{" "}
                            {formatCompletedDate(String(entry.completedDate))}
                          </div>
                          {entry.pointsReceived !== 0 && (
                            <Badge
                              variant={`${
                                entry.completedOnTime ? "special" : "secondary"
                              }`}
                              className="text-xs flex flex-row gap-x-1 cursor-pointer"
                            >
                              <Gem className="h-3 w-3" />
                              <div className="flex flex-row">
                                +{entry.pointsReceived}{" "}
                                <span className="hidden sm:block ml-1">
                                  puntos
                                </span>
                              </div>
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-row items-center space-x-2">
                          <div className="flex">
                            {entry.completedOnTime ? (
                              <span className="text-xs text-muted-foreground">
                                {entry.description}.
                              </span>
                            ) : (
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger className="flex text-left">
                                    <span className="text-xs text-muted-foreground">
                                      {entry.description.length > 20
                                        ? `${entry.description.substring(
                                            0,
                                            20
                                          )}...`
                                        : entry.description}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <span className="text-xs sm:text-sm">
                                      {entry.description}
                                    </span>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            )}
                          </div>
                          <span
                            className={`text-xs text-muted-foreground ${
                              entry.completedOnTime ? "hidden" : "block"
                            }`}
                          >
                            ({entry.progress}%) - (
                            {Math.floor((entry.progress / 100) * entry.goal)}/
                            {entry.goal})
                          </span>
                        </div>
                      </div>
                      <div className="ml-3"></div>
                    </div>
                  ))}
                </div>

                {taskHistoryEntries.length > 6 && !expanded && (
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b h-40 sm:h-20 from-transparent to-background pointer-events-none" />
                )}

                {taskHistoryEntries.length > 6 && (
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
                    Aún no tienes ningún registro...
                  </span>
                  <span className="text-sm sm:text-base text-muted-foreground">
                    ¡Anímate a completar tus tareas y así llevar un seguimiento
                    a tus puntos!
                  </span>
                </div>
                <div className="my-5 flex justify-center">
                  <img
                    className="sm:w-1/2"
                    src="https://github.com/VinuSion/Artiheal/assets/56313573/3d28b6a0-d194-48b8-b1cd-6fd74351a056"
                    alt="no_task_history_entries"
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

export default TaskHistorySection;
