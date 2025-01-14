import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env'});

import express, { Express } from 'express';
import { tasksRouter } from './routes/tasksRouter';
import { errorHandler } from './middlewares/errorHandlerMiddleware';

const app: Express = express();
const port = 3000;

app.use(express.json());
app.use('/tasks', tasksRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});