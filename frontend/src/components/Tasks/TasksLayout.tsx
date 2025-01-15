import { Row } from "antd";
import { TaskCard } from "./TaskCard";

export function TasksLayout() {
  return <Row>
    <TaskCard></TaskCard>
    <TaskCard></TaskCard>
    <TaskCard></TaskCard>
    <TaskCard></TaskCard>
    <TaskCard></TaskCard>
    <TaskCard></TaskCard>
  </Row>;
}