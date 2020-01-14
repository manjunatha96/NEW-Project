require('winston-mongodb')
const express= require('express')
const bodyParser=require('body-parser')
const winston=require('winston')
const cors=require('cors')
const app=express();
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
require('./Middleware/logs')();
require('./router/routes')(app)
require('./Shared/db')();
app.set("view engine", "ejs");
const port=process.env.PORT || 1234;
app.listen(port,()=>winston.info(`Server is connected to ${port}`))