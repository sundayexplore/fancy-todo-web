"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authorize_1 = __importDefault(require("../middlewares/authorize"));
var todo_1 = __importDefault(require("../controllers/todo"));
var todoRouter = express_1.Router();
var authorize = new authorize_1.default();
todoRouter.get('/:userId', todo_1.default.findAll);
todoRouter.get('/:userId/:todoId', todo_1.default.findOne);
todoRouter.post('/:userId', authorize.authorizeTodo, todo_1.default.create);
todoRouter.put('/:userId/:todoId', authorize.authorizeTodo, todo_1.default.update);
todoRouter.delete('/:userId/:todoId', authorize.authorizeTodo, todo_1.default.delete);
exports.default = todoRouter;
