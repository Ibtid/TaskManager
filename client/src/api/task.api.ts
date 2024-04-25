import api from "./api";

const URLS = {
  fetchTasksUrl: "",
};

export const fetchTasks = () => {
  return api.get(URLS.fetchTasksUrl, {
    baseURL: "http://localhost:5000/api/v1/tasks",
  });
};

export const addTasks = (body: any) => {
  return api.post(URLS.fetchTasksUrl, body, {
    baseURL: "http://localhost:5000/api/v1/tasks",
  });
};

export const deleteTask = (id:string) => {
  return api.delete(URLS.fetchTasksUrl, {
    baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
  });
};

export const updateTask = (id:string) => {
  return api.patch(URLS.fetchTasksUrl, {},{
    baseURL: `http://localhost:5000/api/v1/tasks/${id}`,
  });
};
