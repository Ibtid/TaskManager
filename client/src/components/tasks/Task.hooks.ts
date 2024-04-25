import React, { useEffect, useState } from "react";
import { ITask } from "../../interfaces/task";
import { addAllFetchedTasks, addTodo, deleteTodo, editTodo, selectTasks } from "../../todosSlice";
import { addTasks, deleteTask, fetchTasks, updateTask } from "../../api/task.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UiPaths from "../../paths/uiPaths";
import { AddTaskFormData } from "../../hooks/useAddTaskForm";

export const useFetchTasks = () => {
  let tasks: ITask[] = useSelector(selectTasks);
  const dispatchTodo = useDispatch();
  const [loading, setLoading] = useState<Boolean>(false);
  const[error, setError] = useState<Boolean>(false)
  const initFetchTasks = async () => {
    setLoading(true)
    const response = await fetchTasks();
    if(!response.data){
      setError(true)
    }else{
      dispatchTodo(addAllFetchedTasks(response.data.tasks))
    }
    setLoading(false)
  };
  return {
    tasks,
    initFetchTasks,
    error,
    loading
  };
};

export const useAddTasks = () => {
  const dispatchTodo = useDispatch();
  const[error, setError] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const initAddTasks = async (body:AddTaskFormData) => {
    setLoading(true)
    const response = await addTasks(body);
    setLoading(false)
    console.log(response)
    if(!response.data){
      setError(true)
    }else{
      dispatchTodo(addTodo(response.data.task))
      navigate(UiPaths.TasksList)
    }
  };
  return {
    initAddTasks,
    error,
    loading
  };
};

export const useDeleteTasks = () => {
  const dispatchTodo = useDispatch();
  const[error, setError] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false);
  const initDeleteTasks = async (id:string) => {
    setLoading(true)
    const response = await deleteTask(id);
    setLoading(false)
    console.log(response)
    if(!response.data){
      setError(true)
    }else{
      dispatchTodo(deleteTodo(response.data.task))
    }
  };
  return {
    initDeleteTasks,
    error,
    loading
  };
};

export const useUpdateTasks = () => {
  const dispatchTodo = useDispatch();
  const[error, setError] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false);
  const initUpdateTasks = async (id:string) => {
    setLoading(true)
    console.log(id)
    const response = await updateTask(id);
    setLoading(false)
    console.log(response)
    if(!response.data){
      setError(true)
    }else{
      dispatchTodo(editTodo(response.data.task))
    }
  };
  return {
    initUpdateTasks,
    error,
    loading
  };
};