import userController from "../controllers/userController.js";
import Router from "express";

const userRouter = Router();

userRouter.post("/register", userController.register);  
userRouter.post("/login", userController.login);    

export default userRouter;
