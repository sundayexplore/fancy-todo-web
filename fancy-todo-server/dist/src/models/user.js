"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = __importDefault(require("validator"));
var bcryptjs_1 = require("bcryptjs");
var UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: [true, 'First name cannot be empty!']
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: [true, 'Username cannot be empty!'],
        unique: [true, 'Username is not available.']
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty!'],
        unique: [true, 'Email is not available.'],
        validate: [validator_1.default.isEmail, 'Invalid email address!']
    },
    password: {
        type: String,
        required: [true, 'Password cannot be empty!'],
        minlength: [6, 'Minimum length is 6 characters!']
    }
});
UserSchema.pre('save', function (next) {
    this.password = bcryptjs_1.hashSync(this.password, 10);
    this.createdAt = new Date();
    next();
});
UserSchema.pre('update', function (next) {
    this.password = bcryptjs_1.hashSync(this.password, 10);
    this.updatedAt = new Date();
    next();
});
var User = mongoose_1.model('User', UserSchema);
exports.default = User;
