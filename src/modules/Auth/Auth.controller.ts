import { NextFunction, Request, Response } from "express"

enum HEADER {
    API_KEY = 'x-api-key',
    AUTHORIZATION = 'authorization'
}
export class AuthController {
    static Register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log(key);
        if(!key){
            return "authcontroller: loiiiii roi"
        }


    }
}