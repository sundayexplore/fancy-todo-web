"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("./user"));
var todo_1 = __importDefault(require("./todo"));
var router = express_1.Router();
router.use('/users', user_1.default);
router.use('/todos', todo_1.default);
router.use(function (req, res, next) {
    res.send('Please refer to Fancy Todo API Docs!');
});
exports.default = router;
