import express from "express";
const cusRouter = express.Router();

import { index, create, edit, destroy } from "@/controller/cusController";

cusRouter.get("/", index);
cusRouter.post("/", create);
cusRouter.patch("/:id", edit);
cusRouter.delete("/:id", destroy);

export default cusRouter;
