import { Router } from 'express';
import multer from 'multer';

import authMiddleware from './middlewares/authMiddleware';

import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';

const routes = Router()
const upload = multer();

routes.post('/login', UsersController.authenticate)
routes.post('/registrar', upload.none(), UsersController.store)
routes.get('/perfil/:username', UsersController.index)
routes.delete('/deletar/:username', UsersController.delete)

routes.get('/estoque',  ProductsController.index)
routes.get('/estoque/produto/:id', authMiddleware, ProductsController.show)

routes.post('/criar-produto', upload.none(), ProductsController.create)
routes.put('/produtos/:id', ProductsController.edit)
routes.delete('/deletar/produto/:id', ProductsController.delete)


export default routes;