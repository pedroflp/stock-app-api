import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/authMiddleware';

import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

const routes = Router()
const upload = multer();

routes.post('/login', upload.none(), AuthController.authenticate)
routes.post('/registrar', upload.none(), UsersController.store)
routes.get('/usuarios', authMiddleware, UsersController.index)
routes.delete('/deletar/:username', authMiddleware, UsersController.delete)

routes.get('/estoque', authMiddleware, ProductsController.index)
routes.get('/editar/:id', authMiddleware, ProductsController.show)

routes.post('/criar-produto', upload.none(), ProductsController.create)
routes.put('/editar/:id', upload.none(), authMiddleware, ProductsController.edit)
routes.delete('/estoque/:id', authMiddleware, ProductsController.delete)


export default routes;