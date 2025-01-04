

import { model, Schema, Document } from 'mongoose';

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"

// Declare the Schema of the Mongo model
const ApikeySchema: Schema = new Schema({
    key: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    permissions: {
        type:[String],
        default: 'CLIENT',
        enum:['ADMIN','CLIENT','MOD']
    }

}, {
    timestamps: true,
    collection: COLLECTION_NAME
});
const ApiKeyModel = model<Document>(DOCUMENT_NAME, ApikeySchema)

export default ApiKeyModel