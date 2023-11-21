import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Profile from "../models/profileModel";
import Point from "../models/pointsModel";
import Task from "../models/taskModel";
import {
  assignRandomTasks,
  replaceTasksWithoutRepetition,
  getPointsBenefit,
  calculateLevel,
} from "../utils";

const profileRouter = express.Router();

profileRouter.get(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      // Find the health profile that matches the user's ID
      const profile = await Profile.findOne({ userId: req.params.id });

      if (profile) {
        // Health profile found, send it as a response
        res.json(profile);
      } else {
        // Health profile not found
        res
          .status(404)
          .json({ message: "El perfil de salud no se pudo encontrar." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

// Update current tasks route
profileRouter.post(
  "/current-tasks/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const { currentTasksToUpdate, tasks } = req.body;
      const completedTasks: any = [];

      // Checks to see if any task is completed to add it to completedTasks
      for (const currentTask of currentTasksToUpdate) {
        if (currentTask.status) {
          const correspondingTask = tasks.find(
            (task: any) => task._id === currentTask.taskId
          );
          if (correspondingTask) {
            const completedTask = {
              taskId: currentTask.taskId,
              pointsReceived: correspondingTask.pointsAwarded,
              progress: currentTask.progress,
              dueDate: currentTask.dueDate,
              initialDate: currentTask.initialDate,
              completedDate: currentTask.completedDate,
              completedOnTime: true,
            };
            completedTasks.push(completedTask);
          }
        }
      }

      // Find the health profile that matches the user's ID
      const profile = await Profile.findOne({ userId: req.params.id });
      if (profile) {
        let currentTasks = profile.currentTasks;
        if (completedTasks.length > 0) {
          currentTasks = currentTasks.filter((task: any) => {
            return !completedTasks.some(
              (completedTask: any) =>
                completedTask.taskId === task.taskId.toString()
            );
          });
          // We await taskHistory and new points assignment before updating currentTasks
          let taskHistory = profile.taskHistory || []; // If taskHistory doesn't exist, initialize as an empty array
          taskHistory = taskHistory.concat(completedTasks);

          // Updates the taskHistory by adding completedTasks on top of whats already in the history
          profile.taskHistory = taskHistory;
          await profile.save();

          const pointsProfile = await Point.findOne({ userId: req.params.id });
          if (pointsProfile) {
            const { multiplier, division } = getPointsBenefit(
              pointsProfile.level
            );
            let totalPointsEarned = 0;
            const levelInfo = {
              level: pointsProfile.level,
              leveledUp: false,
            };
            completedTasks.forEach((task: any) => {
              const pointsEarned = task.pointsReceived;
              const bonusPoints = Math.floor(pointsEarned * multiplier);
              const additionalPoints = Math.floor(bonusPoints / division);
              // Adds the total points earned for this task to the user's total
              totalPointsEarned +=
                pointsProfile.level === 0
                  ? additionalPoints
                  : pointsEarned + additionalPoints;
            });

            const points = pointsProfile.earnedPoints + totalPointsEarned;
            pointsProfile.earnedPoints = points;
            const { level, nextPoints } = calculateLevel(points);
            pointsProfile.nextLevelPoints = nextPoints;
            if (level > pointsProfile.level) {
              levelInfo.level = level;
              levelInfo.leveledUp = true;
              pointsProfile.level += 1;
            }

            await pointsProfile.save();

            // Updates current tasks with new progress and assigns new replacement tasks
            if (currentTasks.length > 0) {
              const slots = completedTasks.length;
              for (const currentTask of currentTasksToUpdate) {
                // Finds the corresponding task in currentTasks
                const matchingTask = currentTasks.find(
                  (task: any) => task.taskId.toString() === currentTask.taskId
                );
                if (matchingTask) {
                  matchingTask.progress = currentTask.progress;
                }
              }
              const newTasks = await replaceTasksWithoutRepetition(
                currentTasks,
                slots
              );
              const updatedTasks = [...currentTasks, ...newTasks];

              profile.currentTasks = updatedTasks;
              await profile.save();

              // Send the updatedTasks and levelInfo as a response
              res.status(200).json({
                message: "Tareas actualizadas exitosamente",
                updatedTasks,
                taskHistory,
                levelInfo,
              });
            } else {
              const updatedTasks = await assignRandomTasks();

              profile.currentTasks = updatedTasks;
              await profile.save();

              // Send the updatedTasks and levelInfo as a response
              res.status(200).json({
                message: "Tareas actualizadas exitosamente",
                updatedTasks,
                taskHistory,
                levelInfo,
              });
            }
          }
        } else {
          for (const currentTask of currentTasksToUpdate) {
            // Finds the corresponding task in currentTasks
            const matchingTask = currentTasks.find(
              (task: any) => task.taskId.toString() === currentTask.taskId
            );
            if (matchingTask) {
              matchingTask.progress = currentTask.progress;
            }
          }
          const updatedTasks = currentTasks;
          profile.currentTasks = updatedTasks;
          await profile.save();

          // Send the updatedTasks as a response
          res.status(200).json({
            message: "Tareas actualizadas exitosamente",
            updatedTasks,
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "El perfil de salud no se pudo encontrar." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

// Send new food diary route
profileRouter.post(
  "/food-diary/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const { diaryDate, foodEntries, calories, benefit } = req.body;
      const profile = await Profile.findOne({ userId: req.params.id });
      if (profile) {
        let diary = profile.foodDiary || []; // If foodDiary doesn't exist, initialize as an empty array
        const newDiaryEntry = {
          date: new Date(diaryDate),
          foods: foodEntries,
          totalCalories: calories,
          threePointsBenefit: benefit,
        };

        diary = diary.concat(newDiaryEntry);
        // Updates the food diary history by adding newDiaryEntry on top of whats already in the history
        profile.foodDiary = diary;
        await profile.save();

        if (benefit) {
          const pointsProfile = await Point.findOne({ userId: req.params.id });
          if (pointsProfile) {
            const { multiplier, division } = getPointsBenefit(
              pointsProfile.level
            );
            const levelInfo = {
              level: pointsProfile.level,
              leveledUp: false,
            };
            const bonusPoints = Math.floor(3 * multiplier);
            const additionalPoints = Math.floor(bonusPoints / division);
            const totalPointsEarned =
              pointsProfile.level === 0
                ? additionalPoints
                : 3 + additionalPoints;

            const points = pointsProfile.earnedPoints + totalPointsEarned;
            pointsProfile.earnedPoints = points;
            const { level, nextPoints } = calculateLevel(points);
            pointsProfile.nextLevelPoints = nextPoints;
            if (level > pointsProfile.level) {
              levelInfo.level = level;
              levelInfo.leveledUp = true;
              pointsProfile.level += 1;
            }

            await pointsProfile.save();

            // Send the newDiaryEntry and levelInfo as a response
            res.status(200).json({
              message: "Diario alimenticio enviado exitosamente",
              newDiaryEntry,
              levelInfo,
            });
          }
        } else {
          // Send the newDiaryEntry as a response
          res.status(200).json({
            message: "Diario alimenticio enviado exitosamente",
            newDiaryEntry,
          });
        }
      } else {
        res
          .status(404)
          .json({ message: "El perfil de salud no se pudo encontrar." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

profileRouter.post(
  "/tasks-expired/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const expiredTasks = req.body;
      const profile = await Profile.findOne({ userId: req.params.id });
      if (profile) {
        const expiredTaskHistory: any = [];
        let bonusPoints: number = 0;
        for (const expiredTask of expiredTasks) {
          // Finds the task by taskId in the tasks collection
          const task = await Task.findOne({ _id: expiredTask.taskId });
          if (task) {
            const points = Math.floor(
              (expiredTask.progress / 100) * task.pointsAwarded
            );
            bonusPoints += points;
            const expiredTaskEntry = {
              taskId: expiredTask.taskId,
              pointsReceived: points,
              progress: expiredTask.progress,
              dueDate: expiredTask.dueDate,
              initialDate: expiredTask.initialDate,
              completedDate: new Date(new Date().toISOString()),
              completedOnTime: false,
            };
            expiredTaskHistory.push(expiredTaskEntry);
          }
        }

        // We await taskHistory and new points assignment before updating currentTasks
        let taskHistory = profile.taskHistory || []; // If taskHistory doesn't exist, initialize as an empty array
        taskHistory = taskHistory.concat(expiredTaskHistory);

        // Updates the taskHistory by adding expiredTaskHistory tasks on top of whats already in the history
        profile.taskHistory = taskHistory;
        await profile.save();

        if (bonusPoints > 0) {
          const pointsProfile = await Point.findOne({ userId: req.params.id });
          if (pointsProfile) {
            const points = pointsProfile.earnedPoints + bonusPoints;
            pointsProfile.earnedPoints = points;
            const { level, nextPoints } = calculateLevel(points);
            pointsProfile.nextLevelPoints = nextPoints;
            if (level > pointsProfile.level) {
              pointsProfile.level += 1;
            }

            await pointsProfile.save();
          }
        }

        let currentTasks = profile.currentTasks;
        currentTasks = currentTasks.filter((task: any) => {
          return !expiredTasks.some(
            (expiredTask: any) => expiredTask.taskId === task.taskId.toString()
          );
        });

        if (currentTasks.length === 3) {
          // Send a message to avoid adding extra tasks on top
          res.status(200).json({
            message: "No hay necesidad de reemplazar tareas",
          });
        } else {
          if (currentTasks.length > 0) {
            const slots = expiredTasks.length;
            const newTasks = await replaceTasksWithoutRepetition(
              currentTasks,
              slots
            );
            const updatedTasks = [...currentTasks, ...newTasks];

            profile.currentTasks = updatedTasks;
            await profile.save();

            // Send the updatedTasks, taskHistory and bonusPoints as a response
            res.status(200).json({
              message: "Tareas actualizadas exitosamente",
              updatedTasks,
              taskHistory,
              bonusPoints,
            });
          } else {
            const updatedTasks = await assignRandomTasks();

            profile.currentTasks = updatedTasks;
            await profile.save();

            // Send the updatedTasks, taskHistory and bonusPoints as a response
            res.status(200).json({
              message: "Tareas actualizadas exitosamente",
              updatedTasks,
              taskHistory,
              bonusPoints,
            });
          }
        }
      } else {
        res
          .status(404)
          .json({ message: "El perfil de salud no se pudo encontrar." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

export default profileRouter;
