import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';

export const baseUrl = () => {
  return process.env.BASE_URL || "http://localhost:3000";
};

export const generateToken = (user: any) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
  }
  return jwt.sign(
    {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "5d",
    }
  );
};

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT secret is not defined in the environment variables.');
  }
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        (req as Request & { user: any }).user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token Supplied" });
  }
};
