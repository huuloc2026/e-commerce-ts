

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "SHOP"
const COLLECTION_NAME = "SHOPS"

// Declare the Schema of the Mongo model
const shopSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:150,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        enum: ['active','inactive'],
        default: 'inactive'
    },
    verfiy:{
        type:Boolean,
        default: false
    },
    roles:{
        type:Array,
        default:[]
    }
    
},{
    timestamps:true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, shopSchema);