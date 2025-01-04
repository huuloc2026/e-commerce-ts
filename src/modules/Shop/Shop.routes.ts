import express from 'express'

import { CreateNewShopDTO } from 'src/modules/Shop/DTO/Shop/CreateNewShopDTO'
import { asyncHandler } from 'src/middlewares/AsyncHandler'
import { validateMiddleware } from 'src/middlewares/validateDTOmiddleware'
import { ShopController } from 'src/controllers/Shop.Controller'

const ShopRouter = express.Router()

ShopRouter.post('/register', validateMiddleware(CreateNewShopDTO), asyncHandler(ShopController.Register))

export default ShopRouter