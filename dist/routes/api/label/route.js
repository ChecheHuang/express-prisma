"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var labelRouter = express_1.default.Router();
var labelController_1 = require("../../../controller/labelController");
labelRouter.get("/", labelController_1.index);
labelRouter.post("/", labelController_1.create);
labelRouter.delete("/delete", labelController_1.destroy);
exports.default = labelRouter;
