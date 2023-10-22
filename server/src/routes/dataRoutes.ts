import express, { Request, Response } from "express";
import data from "../data";
import FoodModel from "../models/foodModel";
import TaskModel from "../models/taskModel";
import RoutineModel from "../models/routineModel";
import HealthDataModel from "../models/healthDataModel";

const dataRouter = express.Router();

dataRouter.get("/", async (_req: Request, res: Response) => {
  try {
    // Clear existing data
    await FoodModel.deleteMany({});
    await TaskModel.deleteMany({});
    await RoutineModel.deleteMany({});
    await HealthDataModel.deleteMany({});

    // Insert base data
    const createdFoods = await FoodModel.insertMany(data.foods);
    const createdTasks = await TaskModel.insertMany(data.tasks);
    const createdRoutines = await RoutineModel.insertMany(data.routines);
    const createdHealthData = await HealthDataModel.insertMany(data.healthData);

    console.log("Successfuly created base data, check your MongoDB database.");
    res.send({
      createdFoods,
      createdTasks,
      createdRoutines,
      createdHealthData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting base data.");
  }
});

export default dataRouter;
