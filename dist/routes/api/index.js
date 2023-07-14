"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var tokenMiddleware_1 = __importDefault(require("../../middleware/tokenMiddleware"));
var route_1 = __importDefault(require("./user/route"));
var route_2 = __importDefault(require("./label/route"));
var route_3 = __importDefault(require("./cus/route"));
router.use("/user", route_1.default);
router.use("/cus", tokenMiddleware_1.default, route_3.default);
router.use("/label", tokenMiddleware_1.default, route_2.default);
exports.default = router;
