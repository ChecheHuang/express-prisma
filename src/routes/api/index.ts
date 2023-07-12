import express from "express";
const router = express.Router();
import tokenMiddleware from "@/middleware/tokenMiddleware";

import userRouter from "./user/route";
import labelRouter from "./label/route";
import cusRouter from "./cus/route";
router.use("/user", userRouter);
router.use("/cus", tokenMiddleware, cusRouter);
router.use("/label", tokenMiddleware, labelRouter);

export default router;
