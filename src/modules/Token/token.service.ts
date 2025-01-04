import TOKENS from "src/modules/Token/token.model"



interface IKey {
    _id:string,
    access_token: string,
    refresh_token:string
}

export class KeyTokenService {
    static saveKeyToken = async ({userId,publicKey,privateKey}) => {
        const tokens = await TOKENS.create({
            user: userId,
            publicKey, 
            privateKey
        })
        return tokens ? publicKey : null 
  
    }
}

