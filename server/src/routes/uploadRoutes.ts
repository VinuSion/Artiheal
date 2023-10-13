import express, { Request, Response } from 'express';
import { v2 as cloudinary } from 'cloudinary';

const uploadRouter = express.Router();

uploadRouter.post('/', async (req: Request, res: Response) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    
});

export default uploadRouter;