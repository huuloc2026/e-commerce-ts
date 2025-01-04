import express from 'express'
import ShopRouter from './Shop/Shop.routes'
const routes = express.Router()

routes.use('/v1/api',ShopRouter)

export default routes