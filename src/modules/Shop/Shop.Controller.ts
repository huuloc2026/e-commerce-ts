import { NextFunction, Request, Response } from "express"
import { CREATED } from "src/core/sucess.response"

import { filterData } from "src/utils"
import { AuthService } from "../Auth/Auth.service"


export class ShopController {

    static LogIn = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        /** check email in db
         * match password
         * create At vs rf token and save
         * generate apikey
         * get data and log in
         */
        const login = await AuthService.SignIn(req.body)
        CREATED({
            res, message: "Successfully log in", metadata: login,
        })

    }
    static Register = async (req:Request,res:Response,next:NextFunction):Promise<any> => {
        const register = await AuthService.SignUp(req.body)
        CREATED({
            res, message: "Successfully register", metadata: register,
        })
    }
}