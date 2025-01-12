

import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = "KEY-TOKEN"
const COLLECTION_NAME = "KEY-TOKENS"


const tokenSchema: Schema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required: true,
        ref: "SHOPS"
    },
    publicKey: {
        type: String,
        required:true
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshTokenUsed: {
        type: Array,
        default: []
    },
    refreshToken: {
        type:String,
        required:true
    }


}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
const TOKENS = model<Document>(DOCUMENT_NAME, tokenSchema)

export default TOKENS