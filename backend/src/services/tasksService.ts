import { AppDataSource } from '../data-source';
import { Task } from '../entities/Task';
import { AppError } from '../middlewares/errorHandlerMiddleware';

export async function createTask(task: Task): Promise<Task> {
  const newTask = new Task();

  newTask.name = task.name;
  newTask.description = task.description;

  const result = await AppDataSource.manager.save(newTask);

  return result;
}

export async function getAllTasks(): Promise<Task[]> {
  return await AppDataSource.manager.find(Task);
}

export async function stopTask(taskId: number): Promise<Task> {
  let task: Task;
  try {
    task = await AppDataSource.manager.findOneByOrFail(Task, { id: taskId });
  } catch (err) {
    throw AppError.resourceNotFound((<Error> err).message);
  }

  task.endTime = new Date();
  
  return await AppDataSource.manager.save(task);
}