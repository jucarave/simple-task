import express, { Request, Response } from 'express';
import Joi from 'joi';
import { createTask, getAllTasks, stopTask } from '../services/tasksService';
import { Task } from '../entities/Task';

const taskPostSchema = Joi.object({
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
});

const taskStopSchema = Joi.object({
  id: Joi.number()
});

export const tasksRouter = express.Router();

tasksRouter.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const result = taskPostSchema.validate(body);
  if (result.error) {
    res.send(result.error);
    return;
  }

  const newTask = await createTask(body as Task);
  res.send(newTask);
});

tasksRouter.get('/', async (req: Request, res: Response) => {
  const tasks = await getAllTasks();
  res.send(tasks);
});

tasksRouter.patch('/:id/stop', async (req: Request, res: Response) => {
  const taskId = parseInt(req.params['id']);
  const result = taskStopSchema.validate({ id: taskId });
  if (result.error) {
    res.send(result.error);
    return;
  }

  const task = await stopTask(taskId);
  res.send(task);
});