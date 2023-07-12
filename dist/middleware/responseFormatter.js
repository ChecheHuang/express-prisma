"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseBuilder = /** @class */ (function () {
    function ResponseBuilder(res) {
        this.statusCode = 200;
        this.body = {
            status: "success",
        };
        this.res = res;
    }
    ResponseBuilder.prototype.status = function (statusCode) {
        this.statusCode = statusCode;
        return this;
    };
    ResponseBuilder.prototype.data = function (data) {
        this.body.data = data;
        return this;
    };
    ResponseBuilder.prototype.message = function (message) {
        this.body.message = message;
        return this;
    };
    ResponseBuilder.prototype.send = function () {
        return this.res.status(this.statusCode).json(this.body);
    };
    return ResponseBuilder;
}());
function default_1(req, res, next) {
    var response = new ResponseBuilder(res);
    res.success = function (message, data, status) {
        if (status === void 0) { status = 200; }
        res.status(status).json({
            status: "success",
            message: message,
            data: data,
        });
    };
    res.error = function (message, data, status) {
        if (status === void 0) { status = 500; }
        res.status(status).json({
            status: "error",
            message: message,
            data: data,
        });
    };
    res.data = function (data) {
        response.data(data);
        return response;
    };
    res.message = function (message) {
        response.message(message);
        return response;
    };
    res.response = response;
    next();
}
exports.default = default_1;
