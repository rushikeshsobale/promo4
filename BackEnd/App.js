const express = require('express');
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");
 const corsOptions = {
   origin: 'http://3.210.184.253:3000', // Replace with your frontend origin
   credentials: true,
 };
 app.use(cors(corsOptions));
 app.use(cookieParser());
 const router = require('./Route/router');
 
 app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
 app.use(bodyParser.json({ limit: '10mb' }));
 app.use(express.json());
 require("./Conn/connection.js")
 app.use(router);
 app.listen(8080,(err)=>{
    console.log("connection succesfull");
 })