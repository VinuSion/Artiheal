import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';
import Task from "../src/models/taskModel";

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

export const template = (resetLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
  </style>
</head>
<body style="background-color: #ffffff; font-family: 'Poppins', sans-serif; margin: 0; padding: 0;">
  <table
    align="center"
    role="presentation"
    cellspacing="0"
    cellpadding="0"
    border="0"
    width="100%"
    style="max-width: 600px; margin: 0 auto; padding: 20px 0 48px; border-collapse: collapse;"
  >
    <tr>
      <td style="text-align: center; padding: 20px 0;">
        <img
          alt="Artiheal"
          src="https://github.com/VinuSion/Artiheal/assets/56313573/3d61afd6-678f-4e6b-a374-e1bd03226948"
          width="230"
          height="70"
          style="display: block; outline: none; border: none; text-decoration: none; margin: 0 auto;"
        />
      </td>
    </tr>
    <tr>
      <td style="padding: 0 20px; text-align: center;">
        <p style="font-size: 16px; line-height: 26px; margin: 16px 0; text-align: justify;">
          Recientemente solicitaste un cambio de contraseña para tu cuenta en Artiheal. Si eres tú, puedes establecer una nueva contraseña aquí:
        </p>
        <a
          href="${resetLink}"
          target="_blank"
          style="background-color: #765eff; border-radius: 10px; color: #fff; font-size: 16px; text-decoration: none; text-align: center; display: inline-block; line-height: 100%; max-width: 100%; padding: 12px 24px; text-transform: none;"
        >
          Restablecer Contraseña
        </a>
        <p style="font-size: 16px; line-height: 26px; margin: 16px 0; text-align: justify;">
          Si no solicitaste un cambio de contraseña, has caso omiso a este mensaje. Para mantener tu cuenta segura, por favor no reenvíe este correo a nadie.
        </p>
        <p style="font-size: 16px; line-height: 26px; margin: 16px 0; text-align: left;">Cordialmente,<br />Artiheal</p>
        <hr style="width: 100%; border: none; border-top: 1px solid #eaeaea; border-color: #cccccc; margin: 20px 0;" />
        <p style="font-size: 12px; line-height: 24px; margin: 16px 0; color: #8898aa;">
          © Artiheal - 2023 | Todos los derechos reservados
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

export const calculateDueDate = () => {
  const minDays = 3;
  const maxDays = 8;
  const dueDate = new Date();
  const randomDays = minDays + Math.floor(Math.random() * (maxDays - minDays + 1));
  dueDate.setHours(23, 59, 59, 999); // Sets due date to midnight of that day at 11:59:59.999 PM
  dueDate.setDate(dueDate.getDate() + randomDays);
  return dueDate.toISOString();
};

export const assignRandomTasks = async () => {
  const tasks = await Task.find({});
  shuffleArray(tasks);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate = today.toISOString();
  const randomTasks = tasks.slice(0, 3);

  return randomTasks.map((task: any) => ({
    taskId: task._id,
    status: false,
    progress: 0,
    initialDate: new Date(formattedDate),
    dueDate: new Date(calculateDueDate()),
    completedDate: null,
  }));
};

export const replaceTasksWithoutRepetition = async (currentTasks: any, numSlots: number) => {
  const existingTaskIds = currentTasks.map((task: any) => task.taskId.toString()); // Creates an array of existing taskIds

  const allTasks = await Task.find({});
  shuffleArray(allTasks);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const formattedDate = today.toISOString();

  // Initializes an array for new tasks
  const newTasks: any = [];

  // Creates new tasks without repetition
  for (let i = 0; i < numSlots; i++) {
    let taskToAdd: any;
    do {
      taskToAdd = allTasks.pop();
    } while (existingTaskIds.includes(taskToAdd._id) || newTasks.some((newTask: any) => newTask.taskId === taskToAdd._id));

    newTasks.push({
      taskId: taskToAdd._id,
      status: false,
      progress: 0,
      initialDate: new Date(formattedDate),
      dueDate: new Date(calculateDueDate()),
      completedDate: null,
    });
  }

  return newTasks;
};

export const getPointsBenefit = (level: number) => {
  switch (level) {
    case 0:
      return { multiplier: 1, division: 1 };
    case 1:
      return { multiplier: 1.2, division: 4 };
    case 2:
      return { multiplier: 1.6, division: 3 };
    case 3:
      return { multiplier: 2, division: 2 };
    case 4:
      return { multiplier: 2.5, division: 1 };
    default:
      return { multiplier: 1, division: 1 }; // Default multiplier and division if level is not found
  }
};

export const calculateLevel = (earnedPoints: number) => {
  const levels = [
    { minPoints: 0, maxPoints: 24 },
    { minPoints: 25, maxPoints: 99 },
    { minPoints: 100, maxPoints: 499 },
    { minPoints: 500, maxPoints: 1999 },
  ];

  for (let i = levels.length - 1; i >= 0; i--) {
    if (earnedPoints >= levels[i].minPoints) {
      return {
        level: i,
        nextPoints: levels[i + 1] ? levels[i + 1].minPoints - earnedPoints : 0,
      };
    }
  }

  // If the earnedPoints are above the last level, return level 4
  return {
    level: 4,
    nextPoints: 0,
  };
};

