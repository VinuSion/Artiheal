import express, { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Profile from "../models/profileModel";

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
        res.status(404).json({ message: 'El perfil de salud no se pudo encontrar.' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Ha ocurrido un error interno en el servidor.'});
    }
  })
);

export default profileRouter;