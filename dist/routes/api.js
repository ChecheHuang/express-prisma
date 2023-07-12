"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var user_1 = __importDefault(require("./user"));
var cus_1 = __importDefault(require("./cus"));
var label_1 = __importDefault(require("./label"));
var tokenMiddleware_1 = __importDefault(require("../middleware/tokenMiddleware"));
router.use("/user", user_1.default);
router.use("/cus", tokenMiddleware_1.default, cus_1.default);
router.use("/label", tokenMiddleware_1.default, label_1.default);
exports.default = router;
