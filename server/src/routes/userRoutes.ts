import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import Profile from "../models/profileModel";
import Point from "../models/pointsModel";
import HealthData from "../models/healthDataModel";
import { generateToken, baseUrl, template, normalizeName } from "../utils";

const userRouter = express.Router();

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const existing = await User.findOne({ email: req.body.email });
    if (!existing) {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 12),
        pictureURL: "",
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user),
        pictureURL: "",
      });
    } else {
      res.status(401).send({ message: "Ya existe un usuario con ese correo" });
    }
  })
);

userRouter.post(
  "/login",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token: generateToken(user),
          pictureURL: user.pictureURL,
        });
        return;
      }
    }
    res.status(401).send({ message: "Correo o Contraseña invalidos" });
  })
);

userRouter.post(
  "/forgot-password",
  expressAsyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (!process.env.JWT_SECRET) {
        throw new Error(
          "JWT secret is not defined in the environment variables."
        );
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "10min",
      });
      user.resetToken = token;
      await user.save();

      // Reset link
      const resetLink = `${baseUrl()}/reset-password/${token}`;
      const emailTemplate = template(resetLink);

      // Transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EPASS,
        },
      });

      // Send email with Nodemailer
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Solicitastes Cambiar la Contraseña de tu Cuenta - Artiheal",
        html: emailTemplate,
      };

      transporter.sendMail(mailOptions); // Send email with the mailOptions

      res.send({
        message: `Hemos enviado el enlace a tu correo (${req.body.email})`,
      });
    } else {
      res.status(404).send({ message: "No existe un usuario con ese correo" });
    }
  })
);

userRouter.post(
  "/reset-password",
  expressAsyncHandler(async (req: Request, res: Response) => {
    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT secret is not defined in the environment variables."
      );
    }
    jwt.verify(
      req.body.token,
      process.env.JWT_SECRET,
      async (err: Error | null) => {
        if (err) {
          res.status(401).send({
            message: "Fichero se vencio (vuelve a enviar otra solcitud)",
          });
        } else {
          const user = await User.findOne({ resetToken: req.body.token });
          if (user) {
            if (req.body.password) {
              user.password = bcrypt.hashSync(req.body.password, 12);
              await user.save();
              res.send({
                message:
                  "Contraseña cambiada exitosamente, redirigiendo a login...",
              });
            }
          } else {
            res.status(404).send({ message: "Usuario no se pudo encontrar" });
          }
        }
      }
    );
  })
);

// Updates user account info
userRouter.put(
  "/update/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        if (bcrypt.compareSync(req.body.currentPassword, user.password)) {
          if (
            req.body.firstName !== undefined &&
            req.body.firstName.trim() !== ""
          ) {
            const trimmedFirstName = req.body.firstName.trim();
            const first = normalizeName(trimmedFirstName);
            user.firstName = first;
          }
          if (
            req.body.lastName !== undefined &&
            req.body.lastName.trim() !== ""
          ) {
            const trimmedLastName = req.body.lastName.trim();
            const last = normalizeName(trimmedLastName);
            user.lastName = last;
          }
          if (req.body.email !== undefined && req.body.email.trim() !== "") {
            // Checks if the new email is different from the current email
            if (req.body.email !== user.email) {
              // Find a user with the new email
              const userWithNewEmail = await User.findOne({ email: req.body.email });

              // If a user with the new email exists and is not the current user
              if (userWithNewEmail && userWithNewEmail._id.toString() !== user._id.toString()) {
                res.status(400).send({ message: "Otro usuario ya está usando este correo." });
                return;
              }
              // Update the email
              user.email = req.body.email;
            }
          }
          if (
            req.body.password !== undefined &&
            req.body.password.trim() !== ""
          ) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);
            user.password = hashedPassword;
          }

          const updatedUser = await user.save();
          res.send({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            token: generateToken(updatedUser),
            pictureURL: updatedUser.pictureURL,
          });
        } else {
          res
            .status(401)
            .send({ message: "No es la contraseña correcta de tu cuenta." });
        }
      } else {
        res.status(404).send({ message: "Usuario no se pudo encontrar." });
      }
    } catch (err) {
      res.status(500).send({
        message:
          "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  })
);

// Deletes the user account with all its related data
userRouter.delete(
  "/delete/:id",
  expressAsyncHandler(async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;

      // Deletes points profile
      await Point.deleteOne({ userId: userId });
      // Deletes health profile
      await HealthData.deleteOne({ userId: userId });
      // Deletes general profile
      await Profile.deleteOne({ userId: userId });
      // Deletes user account
      await User.findByIdAndRemove(userId);

      res.status(200).send({ message: "Usuario y datos relacionados eliminados exitosamente." });
    } catch (err) {
      res.status(500).send({
        message:
          "Ha ocurrido un error. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  })
);

export default userRouter;
