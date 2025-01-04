import { AppError } from "src/middlewares/error.response";
import { IShop } from "../interface/Shop.interface";
import ShopModel from "../models/Shop.model"
import * as bcrypt from 'bcrypt'
import crypto from 'crypto'
import { CreateToken } from "src/helpers/jwtHepler";
import { filterData } from "src/utils";


enum HEADER {
    API_KEY= 'x-api-key',
    AUTHORIZATION= 'authorization'
}

export class AuthService {
    static SignUp = async (data): Promise<any> => {}
}