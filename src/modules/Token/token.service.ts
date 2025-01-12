import { options } from "joi";
import TOKENS from "src/modules/Token/token.model"



interface IKey {
    _id:string | unknown,
    publicKey: string,
    privateKey:string,
    refreshToken:string
}

export class KeyTokenService {
  static saveKeyToken = async (data: IKey) => {
    const filter = {user: data._id}
    const update = {
        publicKey:data.publicKey,
        privateKey: data.privateKey,
        refreshToken: data.refreshToken
    }
    const options = {upsert:true,new:true}
    const tokens = await TOKENS.findOneAndUpdate(filter, update, options);
    return tokens 
  };
}

