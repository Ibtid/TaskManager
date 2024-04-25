import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import taskRoutes from './task/task.routes'

import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGOURI || "";

const corsOptions ={
  origin:'http://localhost:3000', 
}

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// routes
app.use('/api/v1/tasks', taskRoutes);

mongoose
  .connect(
    mongoUri
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

