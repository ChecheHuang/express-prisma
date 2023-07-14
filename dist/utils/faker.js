"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var faker_1 = require("@faker-js/faker");
var prisma = new client_1.PrismaClient();
function getRandomItemFromArray(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
function randomPhone() {
    var phoneNumber = "09";
    for (var i = 0; i < 8; i++) {
        phoneNumber += Math.floor(Math.random() * 10);
    }
    return phoneNumber;
}
function generateTWID() {
    var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var firstLetter = letters[Math.floor(Math.random() * letters.length)];
    var firstDigit = Math.floor(Math.random() * 2) + 1;
    var rest = "";
    for (var i = 0; i < 8; i++) {
        rest += Math.floor(Math.random() * 10);
    }
    return "".concat(firstLetter).concat(firstDigit).concat(rest);
}
function randomDate() {
    var today = new Date();
    var hundredYearsAgo = new Date();
    hundredYearsAgo.setFullYear(today.getFullYear() - 70);
    var startDate = hundredYearsAgo.getTime();
    var endDate = today.getTime();
    var randomDate = new Date(startDate + Math.random() * (endDate - startDate));
    var year = randomDate.getFullYear();
    var month = parseInt(String(randomDate.getMonth() + 1).padStart(2, "0"));
    var day = parseInt(String(randomDate.getDate()).padStart(2, "0"));
    // return `${year}-${month}-${day}`;
    return new Date(year, month, day);
}
function createCusProfileLabels(cusProfileIds, labelIds) {
    return __awaiter(this, void 0, void 0, function () {
        var _i, cusProfileIds_1, cusProfileId, _a, labelIds_1, labelId, randomNum, data;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _i = 0, cusProfileIds_1 = cusProfileIds;
                    _b.label = 1;
                case 1:
                    if (!(_i < cusProfileIds_1.length)) return [3 /*break*/, 6];
                    cusProfileId = cusProfileIds_1[_i];
                    _a = 0, labelIds_1 = labelIds;
                    _b.label = 2;
                case 2:
                    if (!(_a < labelIds_1.length)) return [3 /*break*/, 5];
                    labelId = labelIds_1[_a];
                    randomNum = Math.random();
                    if (!(randomNum <= 0.25)) return [3 /*break*/, 4];
                    data = { cus_id: cusProfileId, label_id: labelId };
                    return [4 /*yield*/, prisma.cusProfileLabel.create({ data: data })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _a++;
                    return [3 /*break*/, 2];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function createCusProfile(user, length) {
    if (length === void 0) { length = 100; }
    return __awaiter(this, void 0, void 0, function () {
        var levelOptions, statusOptions, cusProfileIds, i, cusProfile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    levelOptions = ["銅", "銀", "金", "白金"];
                    statusOptions = ["新客戶", "舊客戶", "潛在客戶"];
                    cusProfileIds = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < length)) return [3 /*break*/, 4];
                    return [4 /*yield*/, prisma.cusProfile.create({
                            data: {
                                create_user_id: user.id,
                                cus_name: faker_1.fakerZH_TW.person.fullName(),
                                cus_number: randomPhone(),
                                cus_email: faker_1.fakerZH_TW.internet.email(),
                                cus_idnumber: generateTWID(),
                                cus_birthday: randomDate(),
                                cus_remark: faker_1.fakerZH_TW.commerce.product(),
                                cus_status: getRandomItemFromArray(statusOptions),
                                cus_level: getRandomItemFromArray(levelOptions),
                                cus_avatar: faker_1.fakerZH_TW.image.avatar(),
                            },
                        })];
                case 2:
                    cusProfile = _a.sent();
                    cusProfileIds.push(cusProfile.id);
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, cusProfileIds];
            }
        });
    });
}
function createLabels() {
    return __awaiter(this, void 0, void 0, function () {
        var traits, labelIds, _i, traits_1, trait, createdLabel;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    traits = [
                        "勇敢的",
                        "誠實的",
                        "謙遜的",
                        "慷慨的",
                        "善良的",
                        "聰明的",
                        "創意的",
                        "堅定的",
                        "謹慎的",
                        "熱情的",
                    ];
                    labelIds = [];
                    _i = 0, traits_1 = traits;
                    _a.label = 1;
                case 1:
                    if (!(_i < traits_1.length)) return [3 /*break*/, 4];
                    trait = traits_1[_i];
                    return [4 /*yield*/, prisma.labels.create({
                            data: {
                                label_name: trait,
                            },
                        })];
                case 2:
                    createdLabel = _a.sent();
                    labelIds.push(createdLabel.id);
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, labelIds];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var createUser, cusProfileIds, labelIds;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("開始創建資料庫");
                    return [4 /*yield*/, prisma.users.deleteMany()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, prisma.labels.deleteMany()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, prisma.cusProfileLabel.deleteMany()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, prisma.cusProfile.deleteMany()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, prisma.users.create({
                            data: {
                                user_name: "Carl",
                                user_password: "$2b$10$xZ.bJZerVzFShYujW5.jM.7jGH9VNda/gQ2JZyzG3RDWfVzil5ZAG",
                                user_email: "carl@verygood.com.tw",
                                user_avatar: "https://images.pexels.com/photos/6875732/pexels-photo-6875732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                            },
                        })];
                case 5:
                    createUser = _a.sent();
                    console.log("創建會員");
                    return [4 /*yield*/, createCusProfile(createUser, 5000)];
                case 6:
                    cusProfileIds = _a.sent();
                    console.log("創建客戶");
                    return [4 /*yield*/, createLabels()];
                case 7:
                    labelIds = _a.sent();
                    console.log("創建label");
                    // return
                    //todo 創建客戶label資料
                    return [4 /*yield*/, createCusProfileLabels(cusProfileIds, labelIds)];
                case 8:
                    // return
                    //todo 創建客戶label資料
                    _a.sent();
                    console.log("創建客戶label");
                    console.log("創建完畢");
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
