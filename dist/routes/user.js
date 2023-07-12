"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userController_1 = require("../controller/userController");
var tokenMiddleware_1 = __importDefault(require("../middleware/tokenMiddleware"));
var router = express_1.default.Router();
router.post("/register", userController_1.register);
router.post("/login", userController_1.login);
router.get("/userinfo", tokenMiddleware_1.default, userController_1.getUserInfo);
exports.default = router;
