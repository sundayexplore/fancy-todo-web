"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
function generateToken(inputData) {
    var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
    return jsonwebtoken_1.sign(inputData, JWT_SECRET_KEY);
}
exports.default = generateToken;
