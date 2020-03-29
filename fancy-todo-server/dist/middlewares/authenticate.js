"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
exports.default = (function (req, res, next) {
    try {
        var token = req.body.token;
        var JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
        var user = jsonwebtoken_1.verify(token, JWT_SECRET_KEY);
        req.user = user;
        next();
    }
    catch (err) {
        next(err);
    }
});
