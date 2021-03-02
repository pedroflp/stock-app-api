import { Router } from 'express';

import authMiddleware from './middlewares/authMiddleware';

import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';

const routes = Router()

routes.get('/produto', ProductsController.index)
routes.get('/produto/:title', ProductsController.show)
routes.post('/produto', ProductsController.create)

routes.post('/auth', UsersController.authenticate)
routes.get('/usuario', authMiddleware, UsersController.index)
routes.post('/registrar', UsersController.store)

export default routes;