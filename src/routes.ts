import { request, Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/authMiddleware';

import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import AuthController from './controllers/AuthController';

const routes = Router()
const upload = multer();

routes.get('/', upload.none(), AuthController.authenticate);

routes.post('/login', upload.none(), AuthController.authenticate)
routes.post('/registrar', upload.none(), UsersController.store)
routes.get('/:id/estoque', UsersController.index)
routes.delete('/deletar/:username', authMiddleware, UsersController.delete)

// routes.get('/estoque', authMiddleware, ProductsController.index)
routes.get('/:username/editar/:id', ProductsController.show)

routes.post('/criar-produto', upload.none(), ProductsController.create)
routes.put('/:username/editar/:id', upload.none(), ProductsController.edit)
routes.delete('/estoque/:id', ProductsController.delete)


export default routes;
