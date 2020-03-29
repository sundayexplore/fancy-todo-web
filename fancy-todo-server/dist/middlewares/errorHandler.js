"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (err, req, res, next) {
    switch (err.name) {
        case 'AuthorizationError':
            res.status(401).json({ message: err.message });
            break;
        default:
            console.log(err.name);
            res.status(500).json({ message: err.message });
            break;
    }
});
