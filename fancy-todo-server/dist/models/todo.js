"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var ObjectId = mongoose_1.Types.ObjectId;
var TodoSchema = new mongoose_1.Schema({
    userId: {
        type: ObjectId,
        required: [true, 'Todo has to have User ID!']
    },
    name: {
        type: String,
        required: [true, 'Todo name cannot be empty!']
    },
    dueDate: {
        type: Date
    }
});
TodoSchema.pre('save', function (next) {
    this.createdAt = new Date();
    next();
});
TodoSchema.pre('update', function (next) {
    this.updatedAt = new Date();
    next();
});
var Todo = mongoose_1.model('Todo', TodoSchema);
exports.default = Todo;
