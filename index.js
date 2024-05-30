import { environment } from './environment.js';
import Express, { urlencoded } from 'express';
import Mongoose from 'mongoose';
import Cors from 'cors';
import { productModel } from './productModel.js'

// const environment = require('./environment.js');
// const Express = require('express');
// const Mongoose = require('mongoose');

const app = Express();
app.use(Express.json());
app.use(urlencoded({extended:true}));
app.use(Cors({
    origin:'*',
}));
//getting all products
app.get('/product',async (req,res)=>{
    let listOfProduct = await productModel.find();
    if (!listOfProduct) res.status(200).json({
        message: "No products found",
    })
    else res.status(200).json({
        message: "Success fetched products",
        products: listOfProduct
    })
});
//addding product
app.post('/product/add', (req,res)=>{
    console.log('entered');
    const { productId, productName, productDescription, hash } = req.body;
    let product = new productModel({
        productId: productId, 
        productName: productName, 
        productDescription: productDescription, 
        hash: hash
    })
    product.save()
    .then(()=>res.send(product.json({
        message: "Successfully added product",
        productInfo: product
    })))
    .catch((err)=>res.status(400).json({
        message: err,
    }));
})

Mongoose.connect(`mongodb+srv://${environment.mongodb.username}:${environment.mongodb.password}@cluster0.mxwjh5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('database connected');
    app.listen(3000,()=> console.log('server running'));
}).catch((error)=>{
    console.log(error);
    console.log('failed to connect');
})