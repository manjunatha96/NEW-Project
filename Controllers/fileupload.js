const express=require('express');
const router=express.Router();
const multer=require('multer');
const _=require('lodash')
var upload = multer({ dest: 'uploads/' })//to create file
const {Filing}=require('../Shared/Database/fileuploader');

var array = new Array();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './uploads/');
        },
     filename: function (req, file, cb) {
        var originalname = file.originalname;
        var extension = originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length-1];
        cb(null, filename);
      }
    });

router.post('/post',multer({storage: storage, dest: './uploads/'}).single('uploads'), async(req,res)=>{ 
    let result= await new Filing({
        filenames:filename,
        uploads:req.file
    })  
    result.save((err,docs)=>{
    if(!err) res.send(docs)
    else res.status(401).send(err) 
    })
})

router.post('/postMul',multer({storage: storage, dest: './uploads/'}).array('uploads',2), async(req,res)=>{
    let result= await new Filing({
        filenames:filename,
        uploads:req.files
    })  
    result.save((err,docs)=>{
    if(!err) res.send(docs)
    else res.status(401).send(err) 
    })
})

router.get('/download/:id',(req,res)=>{  
    Filing.find({filename:req.params.id},(err,data)=>{  
        if(err){  
            console.log(err)  
        }   
        else{  
           var path=data[0].path ;            
           res.download(path);  
        }  
    })  
}) 


router.get('/downloads/:id',async(req,res)=>{
    Filing.find({ filenames:req.params.id}, (err,data)=>{
        if(!err){
            var path=data[0].uploads[0].path;     
            res.download(path); 
        }
        else
        {
         console.log(err);
        }
    })
})

module.exports=router;