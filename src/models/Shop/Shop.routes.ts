import express from 'express'
import { ShopController } from './Shop.Controller'
const ShopRouter = express.Router()

ShopRouter.post('/register', ShopController.Register)

export default ShopRouter