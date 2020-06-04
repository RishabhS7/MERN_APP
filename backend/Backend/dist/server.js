"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
// import path from 'path';
// const cors = require('cors');
// import expressValidator from 'express-validator';
const expressSession = require("express-session");
const router = require("./routes");
const app = express();
app.use(express.json()); //middlewre
app.use(express.urlencoded({ extended: false })); //if you dont have nested
app.use(expressSession({
    secret: "rishabhsingh",
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false }
})); //secret is used to encrypt..
//connetciong mongo
mongoose.connect('mongodb://localhost/formSubmissions', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected..');
});
app.use(morgan('tiny'));
app.use('/', router);
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listenting to port 8080'));
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
//# sourceMappingURL=server.js.map