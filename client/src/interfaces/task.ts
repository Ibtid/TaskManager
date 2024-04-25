export interface ITask {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: "not_started" | "complete";
}

export interface ITasksState {
  tasks: ITask[];
  selectedTask: ITask | null;
}

export interface ITaskCardProps {
  _id: string;
  title: string;
  description: string;
  date: Date;
  status: "not_started" | "complete";
}
