import express from "express";
const labelRouter = express.Router();

import { create, destroy, index } from "../../../controller/labelController";

labelRouter.get("/", index);
labelRouter.post("/", create);
labelRouter.delete("/delete", destroy);

export default labelRouter;
