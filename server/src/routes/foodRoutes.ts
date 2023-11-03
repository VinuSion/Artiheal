import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Food from "../models/foodModel";

const foodRouter = express.Router();

foodRouter.get(
  "/",
  expressAsyncHandler(async (_: Request, res: Response) => {
    try {
      // Fetch all food documents
      const allFoods = await Food.find({});
      // Send the list of food items as a JSON response
      res.status(200).json(allFoods);
    } catch (error) {
      res.status(500).json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

export default foodRouter;
