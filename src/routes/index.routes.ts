import express from 'express'
import ShopRouter from '../modules/Shop/Shop.routes'
import { apiKey, checkPermission } from 'src/middlewares/checkApi.middleware'
import { asyncHandler } from 'src/middlewares/AsyncHandler'

// this is root routes
const routes = express.Router()




//check api key
//routes.use(asyncHandler(apiKey))

// check permission
//routes.use(asyncHandler(checkPermission('CLIENT')))

routes.use('/v1/api',ShopRouter)

export default routes