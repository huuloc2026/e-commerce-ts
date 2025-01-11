import express from 'express'
import ShopRouter from '../modules/Shop/Shop.routes'
import { apiKey, checkPermission } from 'src/middlewares/checkApi.middleware'
import { asyncHandler } from 'src/middlewares/AsyncHandler'
import AuthRouter from 'src/modules/Auth/Auth.routes'
import { RoleShop } from 'src/modules/Shop/Shop.model'

// this is root routes
const routes = express.Router()




//check api key
routes.use(asyncHandler(apiKey))

// check permission
routes.use(asyncHandler(checkPermission(RoleShop.user)))

routes.use(ShopRouter)
routes.use(AuthRouter);

export default routes