import express, { Request, Response } from "express";
import foodData from "../FOODDATA"
import FoodModel from "../models/foodModel";

const foodDATARouter = express.Router();

foodDATARouter.get("/", async (_req: Request, res: Response) => {
  try {
    // Clear existing data
    await FoodModel.deleteMany({});

    // Insert base data
    const createdFoods = await FoodModel.insertMany(foodData.foods);

    console.log("Successfuly created food data, check your MongoDB database.");
    res.send({
      createdFoods,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error inserting base food data.");
  }
});

export default foodDATARouter;