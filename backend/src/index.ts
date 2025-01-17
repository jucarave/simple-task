import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env'});

import express, { Express } from 'express';
import { tasksRouter } from './routes/tasksRouter';
import { errorHandler } from './middlewares/errorHandlerMiddleware';
import cors from 'cors';

const app: Express = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', tasksRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});