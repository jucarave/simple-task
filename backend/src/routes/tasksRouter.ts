import express, { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { createTask, deleteTask, getAllTasks, stopTask, updateTask } from '../services/tasksService';
import { Task } from '../entities/Task';
import { AppError } from '../middlewares/errorHandlerMiddleware';

const taskPostSchema = Joi.object({
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
});

const taskIdOpperationSchema = Joi.object({
  id: Joi.string().required()
});

const taskUpdateSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
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
    const taskId = req.params['id'];
    const result = taskIdOpperationSchema.validate({ id: taskId });
    if (result.error) {
      throw AppError.requestError(result.error.message);
    }

    const task = await stopTask(taskId);
    res.send(task);
  } catch (err) {
    next(err);
  }
});

tasksRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params['id'];
    const body = req.body;
    const result = taskUpdateSchema.validate(body);
    if (result.error) {
      throw AppError.requestError(result.error.message);
    }

    const task = await updateTask(taskId, body);
    res.send(task);
  } catch (err) {
    next(err);
  }
});

tasksRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const taskId = req.params['id'];
    const result = taskIdOpperationSchema.validate({ id: taskId });
    if (result.error) {
      throw AppError.requestError(result.error.message);
    }

    await deleteTask(taskId);
    res.send({ id: taskId, deleted: true });
  } catch (err) {
    next(err);
  }
});