import express, { Request, Response } from 'express';
import Joi from 'joi';

const taskPostSchema = Joi.object({
  name: Joi.string().trim().not().empty().required(),
  description: Joi.string().trim().not().empty().required()
});

export const tasksRouter = express.Router();

tasksRouter.post('/', (req: Request, res: Response) => {
    const body = req.body;
    const result = taskPostSchema.validate(body);
    if (result.error) {
      res.send(result.error);
      return;
    }

    res.send(body);
  });