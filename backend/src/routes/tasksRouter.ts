import express, { Request, Response } from 'express';
import Joi from 'joi';
import { createTask } from '../services/tasksService';
import { Task } from '../entities/Task';

const taskPostSchema = Joi.object({
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
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