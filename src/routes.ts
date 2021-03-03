import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';

const routes = Router()

routes.post('/login', UsersController.authenticate)
routes.post('/registrar', UsersController.store)
routes.get('/usuario', authMiddleware, UsersController.index)

routes.get('/estoque', authMiddleware, ProductsController.index)
routes.get('/estoque/produto/:id', authMiddleware, ProductsController.show)

routes.post('/produto', authMiddleware, ProductsController.create)
routes.put('/editar/produto/:id', authMiddleware, ProductsController.edit)
routes.delete('/deletar/produto/:id', authMiddleware, ProductsController.delete)


export default routes;