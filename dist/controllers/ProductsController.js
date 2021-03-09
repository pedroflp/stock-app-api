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
const Product_1 = __importDefault(require("../models/Product"));
const products_views_1 = __importDefault(require("../views/products_views"));
exports.default = {
    async index(req, res) {
        const productsRepository = typeorm_1.getRepository(Product_1.default);
        const products = await productsRepository.find();
        return res.json(products_views_1.default.renderMany(products));
    },
    async show(req, res) {
        const { id } = req.params;
        const productsRepository = typeorm_1.getRepository(Product_1.default);
        const product = await productsRepository.findOneOrFail(id);
        return res.json(products_views_1.default.render(product));
    },
    async create(req, res) {
        const { name, quantity, price, user_id } = req.body;
        const productsRepository = typeorm_1.getRepository(Product_1.default);
        const data = {
            name,
            quantity,
            price,
            user_id
        };
        const schema = Yup.object().shape({
            name: Yup.string().required('Nome obrigatório').max(100),
            quantity: Yup.number().required('Quantidade obrigatória'),
            price: Yup.number().required('Preço obrigatório'),
            user_id: Yup.string().required()
        });
        await schema.validate(data, {
            abortEarly: false,
        });
        const product = productsRepository.create(data);
        await productsRepository.save(product);
        return res.json(data);
    },
    async edit(req, res) {
        const id = req.params.id;
        const productsRepository = typeorm_1.getRepository(Product_1.default);
        const { quantity, price } = req.body;
        const product = await productsRepository.findOneOrFail(id);
        productsRepository.merge(product, { quantity, price });
        await typeorm_1.getRepository(Product_1.default).save(product);
        return res.json({ message: `Produto: ${id}, foi editado!` });
    },
    async delete(req, res) {
        const id = req.params.id;
        await typeorm_1.getRepository(Product_1.default).delete(id);
        return res.json({ message: `Produto: ${id} deletado` });
    }
};
