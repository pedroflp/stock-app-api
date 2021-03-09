"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthKey_1 = require("../config/AuthKey");
async function authMiddleware(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.sendStatus(401).json({ message: "Autenticação Falha!" });
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, AuthKey_1.AuthKey);
        const { id } = data;
        req.userId = id;
        return next();
    }
    catch {
        return res.sendStatus(401);
    }
}
exports.default = authMiddleware;
