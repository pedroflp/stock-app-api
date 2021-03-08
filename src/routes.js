"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const routes = express_1.Router();
const upload = multer_1.default();
routes.get('/', upload.none(), AuthController_1.default.authenticate);
routes.post('/login', upload.none(), AuthController_1.default.authenticate);
routes.post('/registrar', upload.none(), UsersController_1.default.store);
routes.get('/:id/estoque', UsersController_1.default.index);
routes.delete('/deletar/:username', authMiddleware_1.default, UsersController_1.default.delete);
// routes.get('/estoque', authMiddleware, ProductsController.index)
routes.get('/:username/editar/:id', ProductsController_1.default.show);
routes.post('/criar-produto', upload.none(), ProductsController_1.default.create);
routes.put('/:username/editar/:id', upload.none(), ProductsController_1.default.edit);
routes.delete('/estoque/:id', ProductsController_1.default.delete);
exports.default = routes;
