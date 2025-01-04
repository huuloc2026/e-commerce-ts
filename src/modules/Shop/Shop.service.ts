import { IShop } from "../../interface/Shop.interface";
import ShopModel from "./Shop.model";
import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { CreateToken } from "src/helpers/jwtHepler";
import { filterData } from "src/utils";
import { KeyTokenService } from "../Token/token.service";
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from "src/core/error.response";

export class ShopService {
    static SignUp = async (data: IShop): Promise<any> => {
        // Check if the shop already exists
        const existShop = await ShopModel.findOne({ email: data.email });
        if (existShop) {
            throw new ConflictError("Email already exists. Please use another email.");
        }
        // Hash the password
        const hashPassword = await bcrypt.hash(data.password, 10);

        // Create a new shop in the database
        const newShop = await ShopModel.create({
            name: data.name,
            email: data.email,
            password: hashPassword,
        });
        if (!newShop) {
            throw new UnauthorizedError("Failed to create shop. Please try again.");
        }

        // Generate public and private keys
        const publicKey = crypto.randomBytes(256).toString("base64");
        const privateKey = crypto.randomBytes(256).toString("base64");

        // Save the keys in the key store
        const keyStore = await KeyTokenService.saveKeyToken({
            userId: newShop._id,
            publicKey,
            privateKey,
        });
        if (!keyStore) {
            throw new NotFoundError("Failed to store key pair. Please try again.");
        }

        // Generate JWT tokens
        const tokens = await CreateToken(
            { email: newShop.email },
            publicKey,
            privateKey
        );

        return {
            code: 201,
            message: {
                data: filterData({ data: newShop, fields: ["_id", "name", "email"] }),
                jwt: filterData({ data: tokens, fields: ["access_token", "refresh_token"] }),
            },
            status: "success",
        };
    };
}
