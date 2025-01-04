import { NextFunction, Request, Response } from "express"
import { AuthService } from "../Auth/Auth.service"

export class ShopController {
    static Register = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
        const register = await AuthService.SignUp(req.body)
        return res.status(201).json(register)
    }
}