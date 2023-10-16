import express, { Request, Response } from "express";
import data from "../data";
import FoodModel from "../models/foodModel";
import TaskModel from "../models/taskModel";
import RoutineModel from "../models/routineModel";

const dataRouter = express.Router();

dataRouter.get("/", async (_req: Request, res: Response) => {
  try {
    // Clear existing data
    await FoodModel.deleteMany({});
    await TaskModel.deleteMany({});
    await RoutineModel.deleteMany({});

    // Insert base data
    const createdFoods = await FoodModel.insertMany(data.foods);
    const createdTasks = await TaskModel.insertMany(data.tasks);
    const createdRoutines = await RoutineModel.insertMany(data.routines);

    console.log("Successfuly created base data, check your MongoDB database.");
    res.send({ createdFoods, createdTasks, createdRoutines });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting base data.");
  }
});

export default dataRouter;
