"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.edit = exports.create = exports.index = void 0;
var prisma_1 = __importDefault(require("../utils/prisma"));
var index = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var page, size, orderBy, where, requestData, skipItems, key, value, total, take, skip, result, data, error_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 3, , 4]);
                page = Number(req.query.page || req.body.page || 1);
                size = Number(req.query.size || req.body.size);
                orderBy = typeof req.query.order === "string" &&
                    req.query.order !== "undefined" &&
                    typeof req.query.sort === "string"
                    ? (_a = {},
                        _a[req.query.sort === "cus_age"
                            ? "cus_birthday"
                            : req.query.sort] = req.query.order.replace(/end/g, ""),
                        _a) : { id: "asc" };
                where = {};
                requestData = __assign(__assign({}, req.query), req.body);
                skipItems = ["page", "size", "sort", "order"];
                for (key in requestData) {
                    if (skipItems.includes(key)) {
                        continue; // 跳過 page 和 size 屬性
                    }
                    value = requestData[key];
                    if (key === "label_name") {
                        // 如果 key 是 "label_name"，則添加特定的過濾條件
                        where = __assign(__assign({}, where), { cus_labels: {
                                some: {
                                    label: {
                                        label_name: {
                                            contains: value,
                                        },
                                    },
                                },
                            } });
                    }
                    else {
                        // 其他 key 保持原來的過濾條件
                        where = __assign(__assign({}, where), (_b = {}, _b[key] = { contains: value }, _b));
                    }
                }
                return [4 /*yield*/, prisma_1.default.cusProfile.count({ where: where })];
            case 1:
                total = _c.sent();
                take = size ? size : total;
                skip = (page - 1) * take;
                return [4 /*yield*/, prisma_1.default.cusProfile.findMany({
                        where: where,
                        orderBy: orderBy,
                        include: {
                            cus_labels: {
                                include: { label: true },
                            },
                        },
                        skip: skip,
                        take: take,
                    })];
            case 2:
                result = _c.sent();
                data = formatData(result);
                // res.json({ status: "success", data: { data, total } });
                res.data({ data: data, total: total }).send();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _c.sent();
                next(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.index = index;
var create = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, cus_name, cus_number, cus_email, cus_idnumber, cus_birthday, cus_remark, cus_status, cus_level, cus_avatar, error_2;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, cus_name = _a.cus_name, cus_number = _a.cus_number, cus_email = _a.cus_email, cus_idnumber = _a.cus_idnumber, cus_birthday = _a.cus_birthday, cus_remark = _a.cus_remark, cus_status = _a.cus_status, cus_level = _a.cus_level, cus_avatar = _a.cus_avatar;
                _c.label = 1;
            case 1:
                _c.trys.push([1, 3, , 4]);
                return [4 /*yield*/, prisma_1.default.cusProfile.create({
                        data: {
                            create_user_id: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.user_id,
                            cus_name: cus_name,
                            cus_number: cus_number,
                            cus_email: cus_email,
                            cus_idnumber: cus_idnumber,
                            cus_birthday: cus_birthday,
                            cus_remark: cus_remark,
                            cus_status: cus_status,
                            cus_level: cus_level,
                            cus_avatar: cus_avatar,
                        },
                    })];
            case 2:
                _c.sent();
                return [2 /*return*/, res.message("新增成功").send()];
            case 3:
                error_2 = _c.sent();
                next(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var edit = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, cus_name, cus_number, cus_email, cus_idnumber, cus_birthday, cus_remark, cus_status, cus_level, label_names, create_cus_labels, _i, create_cus_labels_1, label_id, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, cus_name = _a.cus_name, cus_number = _a.cus_number, cus_email = _a.cus_email, cus_idnumber = _a.cus_idnumber, cus_birthday = _a.cus_birthday, cus_remark = _a.cus_remark, cus_status = _a.cus_status, cus_level = _a.cus_level, label_names = _a.label_names;
                create_cus_labels = label_names.map(function (item) { return ({
                    label_id: parseInt(item.id),
                }); });
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                return [4 /*yield*/, prisma_1.default.cusProfile.update({
                        where: { id: parseInt(id) },
                        data: {
                            cus_name: cus_name,
                            cus_number: cus_number,
                            cus_email: cus_email,
                            cus_idnumber: cus_idnumber,
                            cus_birthday: new Date(cus_birthday),
                            cus_remark: cus_remark,
                            cus_status: cus_status,
                            cus_level: cus_level,
                            cus_labels: {
                                deleteMany: {},
                                // createMany: {
                                //   data: create_cus_labels,
                                // },
                            },
                        },
                    })];
            case 2:
                _b.sent();
                _i = 0, create_cus_labels_1 = create_cus_labels;
                _b.label = 3;
            case 3:
                if (!(_i < create_cus_labels_1.length)) return [3 /*break*/, 6];
                label_id = create_cus_labels_1[_i].label_id;
                return [4 /*yield*/, prisma_1.default.cusProfileLabel.create({
                        data: {
                            cus_id: parseInt(id),
                            label_id: label_id,
                        },
                    })];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                _i++;
                return [3 /*break*/, 3];
            case 6:
                res.message("成功修改").send();
                return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                next(err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.edit = edit;
var destroy = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var cus_id, cusProfile, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cus_id = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prisma_1.default.cusProfile.findUnique({
                        where: {
                            id: cus_id,
                        },
                    })];
            case 2:
                cusProfile = _a.sent();
                if (!cusProfile) {
                    return [2 /*return*/, res.error("沒有該客戶")];
                }
                return [4 /*yield*/, prisma_1.default.cusProfile.delete({
                        where: {
                            id: cus_id,
                        },
                    })];
            case 3:
                _a.sent();
                return [2 /*return*/, res.message("删除成功").send()];
            case 4:
                err_2 = _a.sent();
                next(err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.destroy = destroy;
function formatData(result) {
    var data = result.map(function (cus) {
        var id = cus.id, cus_name = cus.cus_name, cus_number = cus.cus_number, cus_email = cus.cus_email, cus_idnumber = cus.cus_idnumber, cus_remark = cus.cus_remark, cus_status = cus.cus_status, cus_level = cus.cus_level, cus_birthday = cus.cus_birthday, cus_labels = cus.cus_labels, cus_avatar = cus.cus_avatar;
        var cus_age = calculateAge(cus_birthday) + 1;
        var formatDate = cus_birthday === null || cus_birthday === void 0 ? void 0 : cus_birthday.toISOString().substring(0, 10);
        var label_names = cus_labels.map(function (labelInfo) { return labelInfo.label; });
        return {
            id: id,
            key: id,
            cus_name: cus_name,
            cus_number: cus_number,
            cus_email: cus_email,
            cus_idnumber: cus_idnumber,
            cus_birthday: formatDate,
            cus_age: cus_age,
            cus_remark: cus_remark,
            cus_status: cus_status,
            cus_level: cus_level,
            label_names: label_names,
            cus_avatar: cus_avatar,
        };
    });
    return data;
}
function calculateAge(birthday) {
    var birthDate = new Date(birthday);
    var currentDate = new Date();
    var yearsDiff = currentDate.getFullYear() - birthDate.getFullYear();
    var monthsDiff = currentDate.getMonth() - birthDate.getMonth();
    var daysDiff = currentDate.getDate() - birthDate.getDate();
    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
        return yearsDiff;
    }
    return yearsDiff;
}
