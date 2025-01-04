import { AppError } from "src/middlewares/error.response";
import { IShop } from "../interface/Shop.interface";
import ShopModel from "../models/Shop.model"
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import { CreateToken } from "src/helpers/jwtHepler";
import { filterData } from "src/utils";
import { KeyTokenService } from "./token.service";


export class ShopService {
    static SignUp = async (data: IShop): Promise<any> => {
        const existShop = await ShopModel.findOne({ email: data.email })
        if (existShop) {
            return {
                error: 'error',
                message: "Email is Used",
                code: '401'
            }
        }
        const hashPassword = await bcrypt.hash(data.password, 10)
        const newShop = await ShopModel.create({
            name: data.name, email: data.email, password: hashPassword,
        })
        if (!newShop) {
            return "auth service loi 401"
        }
        const publicKey = crypto.randomBytes(256).toString('base64')
        const privateKey = crypto.randomBytes(256).toString('base64')
        const keyStore = await KeyTokenService.saveKeyToken({ userId: newShop._id, publicKey, privateKey })
        if (!keyStore) {
            return "auth service loi 401"
        }
        const tokens = await CreateToken({ email: newShop.email }, publicKey, privateKey)
        return {
            code: "201",
            message: {
                data: filterData({ data: newShop, fields: ['_id', 'name', 'email'] }),
                jwt: filterData({ data: tokens, fields: ['access_token', 'refresh_token'] })
            },
            status: "success",
        };
    }
}