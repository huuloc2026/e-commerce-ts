

import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = "TOKEN"
const COLLECTION_NAME = "TOKENS"


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
    refreshToken: {
        type: Array,
        default: []
    },


}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
const TOKENS = model<Document>(DOCUMENT_NAME, tokenSchema)

export default TOKENS