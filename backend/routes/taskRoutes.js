import taskController from "../controllers/taskController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Router from "express";

const taskRouter = Router();



taskRouter.post("/create",authMiddleware ,taskController.createTask);
taskRouter.get("/", authMiddleware,taskController.getTasks);
taskRouter.get("/:id",authMiddleware, taskController.getOne);
taskRouter.put("/update/:id",authMiddleware, taskController.updateTask);
taskRouter.delete("/delete/:id", authMiddleware, taskController.deleteTask);

export default taskRouter;
