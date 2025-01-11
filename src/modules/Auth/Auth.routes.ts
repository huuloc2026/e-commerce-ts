import express from 'express'

import { CreateNewShopDTO } from 'src/modules/Shop/DTO/CreateNewShopDTO'
import { asyncHandler } from 'src/middlewares/AsyncHandler'
import { validateMiddleware } from 'src/middlewares/validateDTOmiddleware'
import { ShopController } from 'src/modules/Shop/Shop.Controller'
import { apiKey } from 'src/middlewares/checkApi.middleware'

const AuthRouter = express.Router()


AuthRouter.use(apiKey);
AuthRouter.post('/register', validateMiddleware(CreateNewShopDTO), asyncHandler(ShopController.Register))

export default AuthRouter