import React, { FC, Fragment, useState } from "react";
import useAddTaskForm from "../../hooks/tasks/useAddTaskForm";
import { Spinkit } from "../../modals";
import { useTaskApi } from "../../hooks/tasks/useTaskApi";

const AddTaskForm: FC = () => {
  const { addTaskFormData, addTaskFormErrors, handleChange, validateForm } = useAddTaskForm({
    title: "",
    description: "",
    date: null,
  });

  const { addNewTask, error, loading } = useTaskApi();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      addNewTask(addTaskFormData);
    } else {
      console.log("Form is not valid");
    }
  };

  return (
    <Fragment>
      {loading && <Spinkit />}
      <div className="flex items-center justify-center min-h-screen">
        <div className="sm:bg-slate-50 sm:shadow-md sm:rounded-md p-8 w-full max-w-md mb-80 sm:mb-20 bg-white">
          <h2 className="text-2xl font-bold mb-4">Add Task</h2>
          <form onSubmit={handleSubmit} className="max-w-md flex flex-col">
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-lg font-medium text-gray-700"
              >
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={addTaskFormData.title}
                onChange={handleChange}
                className="mt-1 p-2 border-2 rounded-md w-full"
              />
              <span className="text-red-500 text-xs">{addTaskFormErrors.title}</span>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-lg font-medium text-gray-700"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={addTaskFormData.description}
                onChange={handleChange}
                className="mt-1 p-2 border-2 rounded-md w-full"
              />
              <span className="text-red-500 text-xs">
                {addTaskFormErrors.description}
              </span>
            </div>

            <div className="mb-4">
              <label
                htmlFor="selectedDate"
                className="block text-lg font-medium text-gray-700"
              >
                Select a Date:
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={
                  addTaskFormData.date instanceof Date
                    ? addTaskFormData.date.toISOString().split("T")[0]
                    : addTaskFormData.date || ""
                }
                onChange={handleChange}
                className="mt-1 p-2 border-2 rounded-md w-full"
              />
              <span className="text-red-500 text-xs">{addTaskFormErrors.date}</span>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 mt-8 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTaskForm;
