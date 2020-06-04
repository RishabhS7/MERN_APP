import {Application} from "express";
import express = require("express");
import * as  mongoose from 'mongoose';
import morgan = require('morgan');
// import path from 'path';
// const cors = require('cors');
// import expressValidator from 'express-validator';
import expressSession = require('express-session');
import * as router from './routes';

const app:Application=express();
app.use(express.json());//middlewre
app.use(express.urlencoded({extended:false}));//if you dont have nested

app.use(expressSession({
    secret:"rishabhsingh",
    saveUninitialized:false,
    resave:false,
    cookie:{secure:false}}))//secret is used to encrypt..

//connetciong mongo
mongoose.connect('mongodb://localhost/formSubmissions',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log('Mongoose is connected..');
});

app.use(morgan('tiny'));
app.use('/',router as any);

const port=process.env.PORT||8080;
 app.listen(port,()=> console.log('listenting to port 8080'))



// //eq (equal)
// //ne(not Equal)
// //gt(greater than)
// //gte(greater than equal to)
// //lt(less then)
// //lte(less than)
// //in
// //nin(not in)
//
//app.use(cors());//connects 2 server to allowto pass the data 
//