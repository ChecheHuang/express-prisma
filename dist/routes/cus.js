"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var cusController_1 = require("../controller/cusController");
router.get("/", cusController_1.index);
router.get("/index", cusController_1.index2);
router.post("/", cusController_1.create);
router.patch("/:id", cusController_1.edit);
router.delete("/:id", cusController_1.destroy);
exports.default = router;
