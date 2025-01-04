import express from 'express'
import ShopRouter from './Shop.routes'

// this is root routes
const routes = express.Router()




//check api key


//check permission


routes.use('/v1/api',ShopRouter)

export default routes