"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
function loadEnv() {
    if (process.env.NODE_ENV === "development") {
        dotenv_1.default.config({ path: "./.env.development" });
    }
    if (process.env.NODE_ENV === "production") {
        dotenv_1.default.config({ path: "./.env.production" });
    }
}
exports.default = loadEnv;
