

import { model, Schema, Document } from 'mongoose';
import { RoleShop } from 'src/modules/Shop/Shop.model';

const DOCUMENT_NAME = "Apikey"
const COLLECTION_NAME = "Apikeys"

// Declare the Schema of the Mongo model
const ApikeySchema: Schema = new Schema(
  {
    key: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    permissions: {
      type: String,
      default: RoleShop.user,
      enum: [RoleShop]
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);
const ApiKeyModel = model<Document>(DOCUMENT_NAME, ApikeySchema)

export default ApiKeyModel