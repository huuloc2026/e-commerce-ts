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
import { hashPassword, verifyPassword } from "src/helpers/passwordUtil";
import { ILogin } from "src/interface/ILogin";
import { findByEmail } from "src/modules/Shop/Shop.service";
import { generatePairKey } from "src/helpers/generatepairkey";

enum HEADER {
  API_KEY = "x-api-key",
  AUTHORIZATION = "authorization",
}

export class AuthService {
  static SignIn = async (data: ILogin): Promise<any> => {
    //const existShop = await ShopModel.findOne({ email: data.email });
    const existShop = await findByEmail({ email: data.email });
    if (!existShop) {
      throw new UnauthorizedError("Email NOT exists. Please register.");
    }
    const matchPassword = await verifyPassword(
      data.password,
      existShop.password
    );
    if (!matchPassword) {
      throw new UnauthorizedError("password not match...");
    }
    const { publicKey, privateKey } = generatePairKey();
    const tokens = await CreateToken(
      { id: existShop._id, email: existShop.email },
      publicKey,
      privateKey
    );
    const keyStore = await KeyTokenService.saveKeyToken({
      _id: existShop._id,       
      publicKey,
      privateKey,
      refreshToken: tokens.refresh_token
    });
    if (!keyStore) {
      throw new NotFoundError("Failed to store key pair. Please try again.");
    }
  };
  static SignUp = async (data: IShop): Promise<any> => {
    // Check if the shop already exists
    const existShop = await ShopModel.findOne({ email: data.email });
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

    const { publicKey, privateKey } = generatePairKey();
    // Save the keys in the key store
    const keyStore = await KeyTokenService.saveKeyToken({
      _id: newShop._id,
      publicKey,
      privateKey,
      refreshToken: privateKey
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
