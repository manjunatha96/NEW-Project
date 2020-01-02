require('winston-mongodb')
const express= require('express')
const bodyParser=require('body-parser')
const winston=require('winston')
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

require('./Middleware/logs')();
require('./router/routes')(app)
require('./Shared/db')();

const port=process.env.PORT || 1234;
app.listen(port,()=>winston.info(`Server is connected to ${port}`))