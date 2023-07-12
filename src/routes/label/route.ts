const express = require("express");
const labelRouter = express.Router();
const { create, destroy, index } = require("@/controller/labelController");

labelRouter.get("/", index);
labelRouter.post("/", create);
labelRouter.delete("/delete", destroy);

export default labelRouter;
