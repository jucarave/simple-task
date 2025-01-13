import 'reflect-metadata';
import * as dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/../.env'});

import express, { Express } from 'express';
import { tasksRouter } from './routes/tasksRouter';
import { AppDataSource } from './data-source';

const app: Express = express();
const port = 3000;

console.log('password: ' + process.env.DB_PASSWORD);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use('/tasks', tasksRouter);

AppDataSource.initialize()
  .then(() => {
    console.log('[server]: Database initialized');
  })
  .catch((error) => console.error(error));