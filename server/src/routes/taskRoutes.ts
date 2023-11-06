import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Task from "../models/taskModel";

const taskRouter = express.Router();

taskRouter.get(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      // Find the task that matches the ID being sent in
      const task = await Task.findOne({ _id: req.params.id });

      if (task) {
        // Task found, send it as a response
        res.json(task);
      } else {
        // Task not found
        res.status(404).json({ message: "Esa tarea no se pudo encontrar." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Ha ocurrido un error interno en el servidor." });
    }
  })
);

export default taskRouter;
