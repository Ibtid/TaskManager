import { Request, Response } from "express";
import { Task } from "./task.model";
import { StatusCodes } from "http-status-codes";

import fs from "fs";
import path from "path";

class TaskController {
  createTask = async (req: Request, res: Response) => {
    const { title, description, date } = req.body;

    if (!title || !description || !date) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ data: {}, msg: "Todo has been created!", success: false });
    }

    req.body.status = "not_started";

    try {
      const newTask = await Task.create(req.body);
      return res
        .status(StatusCodes.CREATED)
        .json({ data: newTask, msg: "Todo has been created!", success: true });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ data: {}, msg: "Something went wrong!", success: false });
    }
  };

  getTasks = async (req: Request, res: Response) => {
    try {
      const tasks = await Task.find({});

      return res
        .status(StatusCodes.OK)
        .json({
          data: tasks,
          msg: "All Todos have been fetched!",
          success: true,
        });
    } catch (error) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
          data: [],
          msg: "All Todos have been fetched!",
          success: false,
        });
    }
  };

  updateTask = async (id: string) => {
    const updatedTask = await Task.findByIdAndUpdate(
      { _id: id },
      { status: "complete" },
      { new: true }
    );

    if (!updatedTask) {
      console.log("not found");
    } else {
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
      console.log("updated");
    }
  };

  deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete({ _id: id });

    if (!deletedTask) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ data: {}, msg: "Requested task not found!", success: false });
    }

    res
      .status(StatusCodes.OK)
      .json({ data: deletedTask, msg: "Todo has been deleted", success: true });
  };
}

export const taskController = new TaskController();
