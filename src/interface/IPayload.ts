import { Schema } from "mongoose";

export interface IpayloadJWT {
  id: Schema.Types.ObjectId | unknown
  email: string;
}
