"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var env_1 = __importDefault(require("./utils/env"));
(0, env_1.default)();
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var responseFormatter_1 = __importDefault(require("./middleware/responseFormatter"));
var body_parser_1 = __importDefault(require("body-parser"));
var logMiddleware_1 = __importDefault(require("./middleware/logMiddleware"));
var api_1 = __importDefault(require("./routes/api"));
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(responseFormatter_1.default);
app.use(logMiddleware_1.default);
app.get("/", function (req, res) {
    res.send("Hello World!");
});
app.use("/api", api_1.default);
app.use(function (req, res, next) {
    return next((0, http_errors_1.default)(404, "Endpoint not found"));
});
app.use(function (err, req, res, next) {
    console.error(err);
    var errorMessage = "An unknown error occurred: ";
    var statusCode = 500;
    if (err instanceof http_errors_1.default.HttpError) {
        statusCode = err.status;
        errorMessage = err.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("\u26A1\uFE0F[server]: Server is running at http://localhost:".concat(port));
});
