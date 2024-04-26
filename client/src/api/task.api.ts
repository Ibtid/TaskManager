import { AxiosResponse } from "axios";
import api from "./api";
import { ITask } from "../interfaces/task";
import { AddTaskFormData } from "../hooks/tasks/useAddTaskForm";

interface IApiResponse<T> {
  success: boolean;
  data: T;
  msg: string;
}

const URLS = {
  fetchTasksUrl: "",
};

export const fetchTasks = (): Promise<
  AxiosResponse<IApiResponse<ITask[]>>
> => {
  return api.get(URLS.fetchTasksUrl, {
    baseURL: "http://localhost:5000/api/v1/tasks",
  });
};

export const addTasks = (body: AddTaskFormData) : Promise<AxiosResponse<IApiResponse<ITask>>>=> {
  return api.post(URLS.fetchTasksUrl, body, {
    baseURL: "http://localhost:5000/api/v1/tasks",
  });
};

export const deleteTask = (id: string): Promise<AxiosResponse<IApiResponse<ITask>>> => {
  return api.delete(URLS.fetchTasksUrl, {
    baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
  });
};

export const updateTask = (id: string): Promise<AxiosResponse<IApiResponse<ITask>>> => {
  return api.patch(
    URLS.fetchTasksUrl,
    {},
    {
      baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
    }
  );
};
