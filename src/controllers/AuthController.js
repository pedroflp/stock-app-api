"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthKey_1 = require("../config/AuthKey");
const User_1 = __importDefault(require("../models/User"));
exports.default = {
    async authenticate(req, res) {
        const repository = await typeorm_1.getRepository(User_1.default);
        const { username, password } = req.body;
        const user = await repository.findOne({ where: { username } });
        if (!user) {
            return res.sendStatus(401).json({ message: 'Usuário inválido' });
        }
        const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.sendStatus(401).json({ message: 'Senha inválida' });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, AuthKey_1.AuthKey, {
            expiresIn: 259200,
        });
        return res.json({ user, token });
    },
};
