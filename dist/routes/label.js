"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
var _a = require("../controller/labelController"), create = _a.create, destroy = _a.destroy, index = _a.index;
router.get("/", index);
router.post("/", create);
router.delete("/delete", destroy);
exports.default = router;
