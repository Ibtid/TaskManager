import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";
import { ITask, ITasksState } from "./interfaces/task";

const initialState: ITasksState = {
  selectedTask: null,
  tasks: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    selectTask: (state, action: PayloadAction<ITask>) => {
      const taskToBeEdited: ITask = {
        _id: action.payload._id,
        title: action.payload.title,
        status: action.payload.status,
        description: action.payload.description,
        date: action.payload.date,
      };
      state.selectedTask = taskToBeEdited;
    },
    addAllFetchedTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasks = []
      action.payload.forEach((task) => {
        const newTodo: ITask = {
          _id: task._id,
          title: task.title,
          status: task.status,
          description: task.description,
          date: task.date,
        };
        state.tasks.push(newTodo);
      });
    },
    addTodo: (state, action: PayloadAction<ITask>) => {
      const newTodo: ITask = {
        _id: action.payload._id,
        title: action.payload.title,
        status: action.payload.status,
        description: action.payload.description,
        date: action.payload.date,
      };
      state.tasks.push(newTodo);
    },
    editTodo: (state, action: PayloadAction<ITask>) => {
      const task = state.tasks.find((task) => task._id === action.payload._id);
      if (task) {
        // task.title = action.payload.title;
        task.status = 'complete';
        // task.date = action.payload.date;
        // task.description = action.payload.description;
      }
    },
    deleteTodo: (state, action: PayloadAction<ITask>) => {
      const deletedTodoId = action.payload._id;
      state.tasks = state.tasks.filter((task) => task._id !== deletedTodoId);
    },
  },
});

export const { addTodo, editTodo, deleteTodo, selectTask, addAllFetchedTasks } =
  todosSlice.actions;
export const selectTasks = (state: { todos: ITasksState }) => state.todos.tasks;
export const selectedTask = (state: { todos: ITasksState }) =>
  state.todos.selectedTask;

export default todosSlice.reducer;
