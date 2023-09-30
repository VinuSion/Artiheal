import { Request, Response } from 'express';

// Define your route handlers and business logic here

export const getExample = (_: Request, res: Response) => {
  // Implement your logic here
  res.json({ message: 'Example route' });
};
