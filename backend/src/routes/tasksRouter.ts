import express, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { createTask, getAllTasks, stopTask } from '../services/tasksService';
import { Task } from '../entities/Task';
import { AppError } from '../middlewares/errorHandlerMiddleware';

const taskPostSchema = Joi.object({
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
});

const taskStopSchema = Joi.object({
  id: Joi.number()
});

export const tasksRouter = express.Router();

tasksRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body;
    const result = taskPostSchema.validate(body);
    if (result.error) {
      throw AppError.requestError(result.error.message);
    }

    const newTask = await createTask(body as Task);
    res.send(newTask);
  } catch (err) {
    next(err);
  }
});

tasksRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await getAllTasks();
    res.send(tasks);
  } catch (err) {
    next(err);
  }
});

tasksRouter.patch('/:id/stop', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = parseInt(req.params['id']);
    const result = taskStopSchema.validate({ id: taskId });
    if (result.error) {
      throw AppError.requestError(result.error.message);
    }

    const task = await stopTask(taskId);
    res.send(task);
  } catch (err) {
    next(err);
  }
});