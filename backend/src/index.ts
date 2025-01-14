import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env'});

import express, { Express } from 'express';
import { tasksRouter } from './routes/tasksRouter';

const app: Express = express();
const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use('/tasks', tasksRouter);