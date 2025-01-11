import * as bcrypt from "bcrypt";
import crypto from "crypto";
import { CreateToken } from "src/helpers/jwtHepler";
import { filterData } from "src/utils";
import { KeyTokenService } from "../Token/token.service";
import {
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "src/core/error.response";
import ShopModel, { RoleShop } from "../Shop/Shop.model";
import { IShop } from "src/interface/Shop.interface";
import { hashPassword } from "src/helpers/passwordUtil";

enum HEADER {
  API_KEY = "x-api-key",
  AUTHORIZATION = "authorization",
}

export class AuthService {
  static SignIn = async (data): Promise<any> => {};
  static SignUp = async (data: IShop): Promise<any> => {
    // Check if the shop already exists
    const existShop = await ShopModel.findOne({ email: data.email })
    if (existShop) {
      throw new ConflictError(
        "Email already exists. Please use another email."
      );
    }
    // Hash the password
    const hashedPassword = await hashPassword(data.password);

    // Create a new shop in the database
    const newShop = await ShopModel.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      roles: RoleShop.user,
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
      { id: newShop._id, email: newShop.email },
      publicKey,
      privateKey
    );
    return {
      inforUser: filterData({
        fields: ["_id", "name", "email"],
        data: newShop,
      }),
      jwt: filterData({
        fields: ["access_token", "refresh_token"],
        data: tokens,
      }),
    };
  };
}
