"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorize_1 = __importDefault(require("../middlewares/authorize"));
var todoRouter = express_1.Router();
var authorize = new authorize_1.default();
todoRouter.get('/:userId');
todoRouter.get('/:userId/:todoId');
todoRouter.post('/:userId', authorize.authorizeTodo);
todoRouter.put('/:userId/:todoId', authorize.authorizeTodo);
todoRouter.patch('/:userId/:todoId', authorize.authorizeTodo);
todoRouter.delete('/:userId/:todoId', authorize.authorizeTodo);
exports.default = todoRouter;
