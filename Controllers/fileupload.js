const express=require('express');
const router=express.Router();
const multer=require('multer');
const _=require('lodash')
var upload = multer({ dest: 'uploads/' })//to create file
const {Filing}=require('../Shared/Database/fileuploader');

var array = new Array();

router.get('/get',async(req,res)=>{
    await res.send('getting file page')
})

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
    let result= await new Filing(_.pick(req.file,['fieldname','originalname','encoding','mimetype','destination','filename','path','size']))  
    result.save((err,docs)=>{
        if(!err) res.send(docs)
        else res.status(401).send(err) 
    })
})

router.post('/postMul',multer({storage: storage, dest: './uploads/'}).array('uploads',2), async(req,res)=>{
    console.log(req.files.length);
    let u=req.files;
     console.log(u);
     for (let index = 0; index < req.files.length; index++) 
     {
         console.log('-->',req.files[index]);
     }
    
    let result= await new Filing(_.pick(req.file,['fieldname','originalname','encoding','mimetype','destination','filename','path','size']))  
    console.log('file--',result);
    result.save((err,docs)=>{
        if(!err) res.send(docs)
        else res.status(401).send(err) 
    })
})
module.exports=router;