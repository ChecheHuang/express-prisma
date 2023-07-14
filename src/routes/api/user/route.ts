import express from "express";
import {
  login,
  register,
  getUserInfo,
} from "../../../controller/userController";
import tokenMiddleware from "../../../middleware/tokenMiddleware";
const userRouter = express.Router();
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/userinfo", tokenMiddleware, getUserInfo);

export default userRouter;
