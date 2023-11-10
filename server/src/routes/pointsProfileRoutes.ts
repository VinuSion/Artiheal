import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Point from "../models/pointsModel";

const pointsProfileRouter = express.Router();

pointsProfileRouter.get(
    "/:id",
    expressAsyncHandler(async (req: Request, res: Response) => {
      try {
        // Find the points profile that matches the user's ID
        const pointsProfile = await Point.findOne({ userId: req.params.id });
  
        if (pointsProfile) {
          // Points profile found, send it as a response
          res.json(pointsProfile);
        } else {
          // Health profile not found
          res
            .status(404)
            .json({ message: "El perfil de puntos no se pudo encontrar." });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Ha ocurrido un error interno en el servidor." });
      }
    })
  );

export default pointsProfileRouter;