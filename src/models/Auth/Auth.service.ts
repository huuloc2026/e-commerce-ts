import { AppError } from "src/middlewares/error.response";
import { IShop } from "../Shop/Shop.interface";
import ShopModel from "../Shop/Shop.model"
import * as bcrypt from 'bcrypt'



export class AuthService {
    static SignUp = async (data: IShop): Promise<any> => {
        const { name, email, password } = data
        const existShop = await ShopModel.findOne({ email })
        if (existShop) {
            return {
                error: 'error',
                message: "Email is Used",
                code: '401'
            }
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await ShopModel.create({
            name, email, password: hashPassword,
        })
        return {
            code: "201",
            message: "Shop created successfully",
            status: "success",
            data: `oke`,
        };
    }
}