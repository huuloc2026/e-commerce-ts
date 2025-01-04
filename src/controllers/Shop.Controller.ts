import { NextFunction, Request, Response } from "express"
import { ShopService } from "src/modules/Shop/Shop.service"


export class ShopController {
    static Register = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
        const register = await ShopService.SignUp(req.body)
        return res.status(201).json(register)
    }
}