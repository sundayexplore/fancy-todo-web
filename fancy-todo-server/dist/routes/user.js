"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_1 = __importDefault(require("../controllers/user"));
var authorize_1 = __importDefault(require("../middlewares/authorize"));
var authenticate_1 = __importDefault(require("../middlewares/authenticate"));
var userRouter = express_1.Router();
var authorize = new authorize_1.default();
userRouter.post('/signup', user_1.default.signUp);
userRouter.post('/signin', user_1.default.signIn);
userRouter.use(authenticate_1.default);
userRouter.put('/:userId', authorize.authorizeUser, user_1.default.updatePut);
userRouter.patch('/:userId', authorize.authorizeUser, user_1.default.updatePatch);
userRouter.delete('/:userId', authorize.authorizeUser, user_1.default.delete);
exports.default = userRouter;
