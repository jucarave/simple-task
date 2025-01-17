import { Row } from "antd";
import { TaskCard } from "./TaskCard";
import { useEffect, useState } from "react";
import { Task } from "../../interfaces/Task";
import { getTasks } from "../../utils/client";

export function TasksLayout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async() => {
      const result = await getTasks();
      setTasks(result.data);
    };

    fetchTasks();
  }, []);

  return <Row>
    {(tasks).map((task) => (
      <TaskCard key={task.id} id={task.id} name={task.name} description={task.description} />
    ))}
  </Row>;
}