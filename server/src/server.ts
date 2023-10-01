import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import { ErrorRequestHandler } from 'express';
import exampleRoutes from './routes/exampleRoutes';

dotenv.config();

export const baseUrl = () => {
    process.env.BASE_URL
        ? process.env.BASE_URL
        : process.env.NODE_ENV !== "production"
            ? "http://localhost:3000"
            : "https://yourdomain.com";
};

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, "/client/dist")));

// Underscore _ is req
app.get("*", (_, res) =>
    res.sendFile(path.join(__dirname, "/client/dist/index.html"))
);

// Underscores _ are both 'req' and 'next' respectively
const errorHandler: ErrorRequestHandler = (err, _, res, __) => {
    res.status(500).send({ message: err.message });
};
app.use(errorHandler);

// ALL API ENDPOINTS FOR THE SERVER GO HERE

// Routes
app.use('/api/examples', exampleRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGODB_URL || '', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is live at https://localhost:${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error);
    });
