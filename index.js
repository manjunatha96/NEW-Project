require('winston-mongodb')
const express= require('express')
const bodyParser=require('body-parser')
const winston=require('winston')
const cors=require('cors')
const app=express();
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var store= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./upload')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }
})
var upload=multer({storage:store}).single('file');

app.post('/upload',(req,res,next)=>{
    upload(req,res,(err)=>{
        return res.status(501).json({error:err})
    })
    res.json({originalname:req.file.originalname,uploadname:req.file.filename})
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors())
require('./Middleware/logs')();
require('./router/routes')(app)
require('./Shared/db')();
app.set("view engine", "ejs");
const port=process.env.PORT || 1234;
app.listen(port,()=>winston.info(`Server is connected to ${port}`))