import { Request, Response } from "express";
import { Task } from "./task.model";
import { StatusCodes } from "http-status-codes";

import fs from "fs";
import path from "path";

class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Title and description must be provided.");
    }

    const newTask = await Task.create(req.body);
    res
      .status(StatusCodes.CREATED)
      .json({ task: newTask, msg: "Todo has been created!" });
  };

  getTasks = async (req: Request, res: Response) => {
    const tasks = await Task.find({});

    return res
      .status(StatusCodes.OK)
      .json({ tasks, msg: "All Todos have been fetched!" });
  };

  getSingleTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const task = await Task.findById({ _id: id });

    if (!task) {
      throw new Error("Requested todo not found!");
    }

    res.status(StatusCodes.OK).json({ task, msg: "Success" });
  };

  updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { status: "complete" },
      { new: true }
    );

    if (!updatedTask) {
      throw new Error("Requested todo not found!");
    }

    const filePath = path.join(__dirname, "taskLog.txt");
    const logData = `Task ID: ${
      updatedTask._id
    }, Time: ${new Date().toISOString()}, Description: ${
      updatedTask.description
    }\n`;

    fs.appendFile(filePath, logData, (err) => {
      if (err) {
        console.error("Error appending to file:", err);
      }
    });

    res
      .status(StatusCodes.OK)
      .json({ task: updatedTask, msg: "Todo has been updated" });
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      throw new Error("Requested todo not found!");
    }

    res
      .status(StatusCodes.OK)
      .json({ task: deletedTask, msg: "Todo has been deleted" });
  };
}

export const taskController = new TaskController();
