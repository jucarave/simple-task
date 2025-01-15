import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { AppError } from '../middlewares/errorHandlerMiddleware';

const taskRepository = AppDataSource.getRepository(Task);

export async function createTask(task: Task): Promise<Task> {
  const newTask = new Task();

  newTask.name = task.name;
  newTask.description = task.description;

  const result = await taskRepository.save(newTask);

  return result;
}

export async function getAllTasks(): Promise<Task[]> {
  return await taskRepository.find();
}

export async function stopTask(taskId: number): Promise<Task> {
  let task: Task;
  try {
    task = await taskRepository.findOneByOrFail({ id: taskId });
  } catch (err) {
    throw AppError.resourceNotFound((<Error> err).message);
  }

  task.endTime = new Date();
  
  return await taskRepository.save(task);
}

export async function updateTask(taskId: number, task: Task): Promise<Task> {
  let dbTask: Task;
  try {
    dbTask = await taskRepository.findOneByOrFail({ id: taskId });
  } catch (err) {
    throw AppError.resourceNotFound((<Error> err).message);
  }

  dbTask.name = task.name;
  dbTask.description = task.description;

  return await taskRepository.save(dbTask);
}

export async function deleteTask(taskId: number): Promise<DeleteResult> {
  try {
    await taskRepository.findOneByOrFail({ id: taskId });
  } catch (err) {
    throw AppError.resourceNotFound((<Error> err).message);
  }

  return await taskRepository.delete({id: taskId});
}