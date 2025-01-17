import axios from "axios";
import { Task } from "../interfaces/Task";
import { config } from './env'

const host = config.API_URL;

export async function getTasks() {
  return await axios.get<Task[]>(`${host}/tasks`);
}