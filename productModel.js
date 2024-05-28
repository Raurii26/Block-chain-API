import Mongoose from 'mongoose';

const productModelSchema = new Mongoose.Schema({
    productId:{
        type: String,
        required: true,
    },
    productName:{
        type: String,
        required: true,
    },
    productDescription:{
        type: String,
        required: true,
    },
    hash:{
        type: Number,
        required:true
    },
},{
    timestamp:true
})

export const productModel = Mongoose.model("Product", productModelSchema);