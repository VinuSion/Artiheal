import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import HealthData from "../models/healthDataModel";
import Routine from "../models/routineModel";
import Profile from "../models/profileModel";
import Point from "../models/pointsModel";
import { assignRandomTasks } from "../utils";

const healthDataRouter = express.Router();

healthDataRouter.get(
  "/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      // Find health data that matches the user's ID
      const healthData = await HealthData.findOne({ userId: req.params.id });

      if (healthData) {
        // Health data found, send it as a response
        res.json(healthData);
      } else {
        // Health profile not found
        res.status(404).json({ message: 'Los datos de salud no se pudieron encontrar.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.' });
    }
  })
);

healthDataRouter.post(
  "/create/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const userId = req.params.id; // Extract the user ID from the URL parameters
      const healthData = req.body; // Access the health data from the request body

      // Create a new document in 'healthData' collection
      const newHealthData = new HealthData({
        userId,
        dateOfBirth: healthData.dateOfBirth,
        height: healthData.height,
        weight: healthData.weight,
        bmi: healthData.bmi,
        dietaryPreference: healthData.dietaryPreference,
        allergies: healthData.allergies,
        medications: healthData.medications
      });

      // Saves the new health data document
      await newHealthData.save();

      // Finds the routine based on dietary preference
      const selectedRoutine = await Routine.findOne({ dietaryPreference: healthData.dietaryPreference });

      if (!selectedRoutine) {
        throw new Error('No existe una rutina para esa preferencia de dieta.');
      }

      // Gets 3 random tasks to assign to the user
      const tasks = await assignRandomTasks();

      // Creates new default points profile
      const newPoints = new Point({
        userId,
        earnedPoints: 0,
        level: 0, 
        nextLevelPoints: 25, 
      });

      // Saves the new default points profile
      await newPoints.save();

      // Creates the user profile document
      const newProfile = new Profile({
        userId,
        foodDiary: [],
        currentTasks: tasks,
        taskHistory: [],
        selectedRoutine: selectedRoutine._id, // Assigns the routine ID
        medications: [],
      });

      // Saves the new user profile document
      await newProfile.save();

      res.status(201).json(newHealthData);
    } catch (error) {
      res.status(500).send({ message: 'Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.' });
    }
  })
);

export default healthDataRouter;
