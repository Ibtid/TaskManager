import React, { useEffect, useState } from "react";
import { ITask } from "../../interfaces/task";
import { addAllFetchedTasks, addTodo, deleteTodo, editTodo, selectTasks } from "../../todosSlice";
import { addTasks, deleteTask, fetchTasks, updateTask } from "../../api/task.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UiPaths from "../../paths/uiPaths";
import { AddTaskFormData } from "./useAddTaskForm";

export const useTaskApi = () => {
  const dispatchTodo = useDispatch();
  const tasks: ITask[] = useSelector(selectTasks);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const fetchAllTasks = async () => {
    setLoading(true);
    const response = await fetchTasks();
    setLoading(false);

    if (!response.data.success) {
      setError(true);
      alert(response.data.msg);
    } else {
      dispatchTodo(addAllFetchedTasks(response.data.data));
    }
  };

  const addNewTask = async (body: AddTaskFormData) => {
    setLoading(true);
    const response = await addTasks(body);
    setLoading(false);

    if (!response.data.success) {
      setError(true);
      alert(response.data.msg);
    } else {
      dispatchTodo(addTodo(response.data.data));
      navigate(UiPaths.TasksList);
    }
  };

  const deleteSelectedTask = async (id: string) => {
    setLoading(true);
    const response = await deleteTask(id);
    setLoading(false);

    if (!response.data.success) {
      setError(true);
      alert(response.data.msg);
    } else {
      dispatchTodo(deleteTodo(response.data.data));
    }
  };

  const updateSelectedTask = async (task: ITask) => {
      // dispatchTodo(editTodo(task));
  };

  return {
    tasks,
    loading,
    error,
    fetchAllTasks,
    addNewTask,
    deleteSelectedTask,
    updateSelectedTask,
  };
};