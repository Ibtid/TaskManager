import { Schema, model, Document } from "mongoose";
import fs from "fs";
import path from "path";
import { taskController } from "./task.controllers";

interface Task extends Document {
  title: string;
  description: string;
  date: Date;
  status: "not_started" | "complete";
}

const taskSchema = new Schema<Task>(
  {
    title: {
      type: String,
      required: [true, "Title should not be empty!"],
    },
    description: {
      type: String,
      required: [true, "Description should not be empty!"],
    },
    date: {
      type: Date,
      required: [true, "Date should be specified!"],
    },
    status: {
      type: String,
      enum: ["not_started", "complete"],
      default: "not_started",
    },
  },
  { timestamps: true }
);

taskSchema.post("save", async function (this: Task) {
    if (this.status !== "complete") {
      setTimeout(() => {
        console.log("Updating", this._id);
        taskController.updateTask(this._id)
      }, this.date.getTime() - Date.now());
    }
  });

export const Task = model<Task>("Task", taskSchema);
