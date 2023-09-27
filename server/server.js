import express from "express";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

export const baseUrl = () => {
  process.env.BASE_URL
    ? process.env.BASE_URL
    : process.env.NODE_ENV !== "production"
    ? "http://localhost:3000"
    : "https://yourdomain.com";
};

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ALL API ENDPOINTS FOR THE SERVER GO HERE

app.use(express.static(path.join(__dirname, "/client/dist")));

// Underscore _ is req
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// Underscores _ are both 'req' and 'next' respectively
app.use((err, _, res, _) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is live at http://localhost:${port}`);
});
