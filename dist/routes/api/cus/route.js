"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cusRouter = express_1.default.Router();
var cusController_1 = require("../../../controller/cusController");
cusRouter.get("/", cusController_1.index);
cusRouter.post("/", cusController_1.create);
cusRouter.patch("/:id", cusController_1.edit);
cusRouter.delete("/:id", cusController_1.destroy);
exports.default = cusRouter;
