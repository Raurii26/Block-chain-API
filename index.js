import { environment } from './environment.js';
import Express, { urlencoded } from 'express';
import Mongoose from 'mongoose';
import Cors from 'cors';

// const environment = require('./environment.js');
// const Express = require('express');
// const Mongoose = require('mongoose');

const app = Express();
app.use(Express.json());
app.use(urlencoded({extended:true}));
app.use(Cors({
    origin:'*',
}));
app.use('/',()=>{
    console.log('test');
});

Mongoose.connect(`mongodb+srv://${environment.mongodb.username}:${environment.mongodb.password}@cluster0.mxwjh5v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(()=>{
    console.log('database connected');
    app.listen(3000,()=> console.log('server running'));
}).catch((error)=>{
    console.log(error);
    console.log('failed to connect');
})