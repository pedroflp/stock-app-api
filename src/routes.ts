import { Router } from 'express';
import ProductsController from './controllers/ProductsController'

const routes = Router()

routes.get('/produto', ProductsController.index)
routes.get('/produto/:title', ProductsController.show)
routes.post('/produto', ProductsController.create)

export default routes;