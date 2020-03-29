"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = require("dotenv");
var mongoose_1 = __importDefault(require("mongoose"));
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.config();
}
var app = express_1.default();
var port = process.env.PORT || 3000;
app.use(cors_1.default());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/fancy-todo-api', {
    useNewUrlParser: true
});
app.listen(port, function () {
    console.log("Sunday's API is running on port " + port + "!");
});
exports.default = app;
