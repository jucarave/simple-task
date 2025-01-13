import express, { Express } from 'express';
import { tasksRouter } from './routes/tasks';

const app: Express = express();
const port = 3000;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

app.use(express.json());
app.use('/tasks', tasksRouter);

