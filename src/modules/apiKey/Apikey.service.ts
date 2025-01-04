import ApiKeyModel from "src/modules/apiKey/ApiKey.model"
import * as crypto from 'crypto'

export const findById = async (key) => {
    // const testKey = await ApiKeyModel.create({
    //     key: crypto.randomBytes(64).toString('hex'),
    // })
    const objectKey = await ApiKeyModel.findOne({key,status:true})
    return objectKey
}
