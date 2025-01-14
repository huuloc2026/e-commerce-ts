import express from 'express'

import { CreateNewShopDTO } from 'src/modules/Shop/DTO/CreateNewShopDTO'
import { asyncHandler } from 'src/middlewares/AsyncHandler'
import { validateMiddleware } from 'src/middlewares/validateDTOmiddleware'
import { ShopController } from 'src/modules/Shop/Shop.Controller'

const ShopRouter = express.Router()

ShopRouter.post('/shop', validateMiddleware(CreateNewShopDTO), asyncHandler(ShopController.Register))

export default ShopRouter