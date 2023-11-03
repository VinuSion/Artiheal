import express from "express";
import cors from 'cors';
import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";
import { baseUrl } from './utils';

import { ErrorRequestHandler } from "express";
import userRouter from "./routes/userRoutes";
import uploadRouter from "./routes/uploadRoutes";
import dataRouter from "./routes/dataRoutes";
import healthDataRouter from "./routes/healthProfileRoutes";
import profileRouter from "./routes/profileRoutes";
import routineRouter from "./routes/routineRoutes";
import foodRouter from "./routes/foodRoutes";

config(); // Setup dotenv

// Setup cors to allow cross-origin requests only from localhost url or hosted url with baseUrl
const corsOptions: cors.CorsOptions = {
  origin: baseUrl(), // Adjust the origin as needed
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URL!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

const app = express(); // Setup express
const frontend = path.resolve(__dirname, '../../client/dist'); // Setup path for dist folder
const port = process.env.PORT || 4000; // Setup server port

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL API ENDPOINTS FOR THE SERVER
app.use("/api/upload", uploadRouter);
app.use("/api/data", dataRouter);
app.use("/api/users", userRouter);
app.use("/api/health-data", healthDataRouter);
app.use("/api/profile", profileRouter);
app.use("/api/routine", routineRouter);
app.use("/api/foods", foodRouter);

// Resolving vite frontend path
app.use(express.static(frontend));

// Underscore _ is req
app.get("*", (_, res) =>
  res.sendFile(path.join(frontend, "index.html"))
);

// Underscores _ are both 'req' and 'next' respectively
const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
  res.status(500).send({ message: err.message });
};
app.use(errorHandler);

// Listen for backend server on port 4000
app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
