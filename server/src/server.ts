import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import path from "path";

import { ErrorRequestHandler } from "express";

config(); // Setup dotenv

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

export const baseUrl = () => {
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== "production"
    ? "http://localhost:5173"
    : "https://yourdomain.com";
};

const app = express(); // Setup express
const frontend = path.resolve(__dirname, '../../client/dist'); // Setup path for dist folder
const port = process.env.PORT || 4000; // Setup server port

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL API ENDPOINTS FOR THE SERVER GO HERE
// Routes go here

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
