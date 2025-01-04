

import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"

// Declare the Schema of the Mongo model
const ApikeySchema: Schema = new Schema({
    key: {
        type: String,
        required: true,
        maxLength: 150,
    },
    status: {
        type: Boolean,
        required: true,
        unique: true,
    },
    permission: {
        type:[String],
        required:true,
        enum:['ADMIN','CLIENT','MOD']
    }

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
const ApiKeyModel = model<Document>(DOCUMENT_NAME, ApikeySchema)

export default ApiKeyModel