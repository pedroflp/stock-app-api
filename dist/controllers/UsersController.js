"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Yup = __importStar(require("yup"));
const User_1 = __importDefault(require("../models/User"));
const users_views_1 = __importDefault(require("../views/users_views"));
exports.default = {
    async index(req, res) {
        const id = req.params.id;
        const usersRepository = typeorm_1.getRepository(User_1.default);
        const user = await usersRepository.findOneOrFail({ where: { id }, relations: ['products'] });
        return res.json(users_views_1.default.render(user));
    },
    async store(req, res) {
        const user = await typeorm_1.getRepository(User_1.default);
        const { username, email, password } = req.body;
        const userExists = await user.findOne({ where: { username, email } });
        if (userExists) {
            return res.sendStatus(409).json({ message: 'Usuário ou email já em uso!' });
        }
        const data = {
            username,
            email,
            password,
        };
        const schema = Yup.object().shape({
            username: Yup.string().required('Username obrigatório').max(15),
            email: Yup.string().required('Email obrigatório'),
            password: Yup.string().required('Senha obrigatória')
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const newUser = user.create(data);
        await user.save(newUser);
        return res.json(newUser);
    },
    async delete(req, res) {
        const usernameParam = req.params.username;
        const userRepository = typeorm_1.getRepository(User_1.default);
        const { username, } = req.body;
        const userExists = await userRepository.findOne({ where: { usernameParam } });
        if (!userExists) {
            return res.json({ message: `O usuário ${username} não foi encontrado!` });
        }
        else if (username == usernameParam) {
            const user = await userRepository.findOneOrFail({ where: { username } });
            await typeorm_1.getRepository(User_1.default).delete(user);
            return res.json({ message: `Usuário ${username} deletado` });
        }
        else {
            return res.json({ message: `Usuário ${username} não pode deletar ${usernameParam}` });
        }
    }
};
