import express from "express";
import { taskController } from "./task.controllers";

const router = express.Router();

router.route("/").post(taskController.createTask).get(taskController.getTasks);

router
  .route("/:id")
  .delete(taskController.deleteTask);

export default router;
