import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Routine from "../models/routineModel";
import Food from "../models/foodModel";

const routineRouter = express.Router();

routineRouter.get(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      // Find the routine that matches the ID being sent in
      const routine = await Routine.findOne({ _id: req.params.id });

      if (routine) {
        // Routine found, send it as a response
        res.json(routine);
      } else {
        // Routine not found
        res.status(404).json({ message: 'La rutina alimenticia no se pudo encontrar.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.' });
    }
  })
);

routineRouter.get(
  "/food/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      // Find the food name that matches the foodId being sent in
      const food = await Food.findOne({ foodId: req.params.id });

      if (food) {
        // Food found, send it as a response
        res.json(food);
      } else {
        // Food not found
        res.status(404).json({ message: 'Ese alimento no se pudo encontrar.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.' });
    }
  })
);

export default routineRouter;