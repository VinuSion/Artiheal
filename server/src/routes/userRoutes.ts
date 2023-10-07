import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel";
import { isAuth, generateToken, baseUrl } from '../utils';

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
        password: bcrypt.hashSync(req.body.password),
      });
      const user = await newUser.save();
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: generateToken(user),
      });
    } else {
      res.status(401).send({ message: 'Ya existe un usuario con ese correo' });
    }
  })
);

userRouter.post(
  '/login',
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
        });
        return;
      }
    }
    res.status(401).send({ message: 'Correo o Contraseña invalidos' });
  })
);

export default userRouter;
