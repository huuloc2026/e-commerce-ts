import { NextFunction, Request, Response } from "express";
import { HEADERS } from "src/constants/header";
import { ForbiddenError } from "src/core/error.response";
import { findById } from "src/modules/apiKey/Apikey.service";


export const apiKey = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    const key = req.headers[HEADERS.API_KEY]?.toString()
    if (!key) {
        return res.status(404).json({
            message: "key api not found"
        })
    }
    const objKey = await findById(key)
    if (!objKey){
        throw new ForbiddenError("Object key Forbiden")
    }
    req.objKey = objKey
    return next()
}   

export const checkPermission = (permission) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: "permission denied"
            })
        }
        const validpermission= req.objKey.permissions.includes(permission)
        if(!validpermission){
            return res.status(403).json({
                message: "permission denied"
            })
        }
        return next()
    }
}