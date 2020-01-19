const express=require('express');
const router=express.Router();
const {registerUser,validate}=require('../Shared/Database/registarion')
const _=require('lodash')
const bcrypt=require('bcryptjs')
const multer=require('multer');
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

router.get('/get',async(req,res)=>{
    const result=await registerUser.find()
    .populate('role_id')
    await res.send(result)
})
router.get('/get/:id',async(req,res)=>{
    const result=await registerUser.findById(req.params.id)
    .populate('role_id')
    await res.send(result)
})

router.post('/post',multer({storage: storage, dest: './uploads/'}).single('uploads'),async(req,res)=>{

    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const valid=await registerUser.findOne({email:req.body.email})
    if(valid) res.status(400).send('Email already exits..')

    let result= await new registerUser({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        Mobile_No:req.body.Mobile_No,
        email:req.body.email,
        password:req.body.password,
        role_id:req.body.role_id,
        uploads:req.file
    })

    const salt= await bcrypt.genSalt(10)
    result.password= await bcrypt.hash(result.password,salt)
    await result.save((err,docs)=>{
        const token= result.genrate()
        if(!err) res.header('X1-login',token).send({token})
        else console.error('Error while sendinf the data...',JSON.stringify(err,undefined,2))        
    })
})

router.put('/update_password', async(req,res)=>{

    const valid=await registerUser.findOne({email:req.body.email})
    if(!valid) res.status(400).send('Email not exits..')

    const salt= await bcrypt.genSalt(10)
    const results= await bcrypt.hash(req.body.password,salt)
    req.body.password=results;
    await registerUser.findOneAndUpdate({email:req.body.email},{$set:
        _.pick(req.body,['password']),
    },{new : true},(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while updating the data...',JSON.stringify(err,undefined,2))        
    })
} )

router.delete('/delete/:id',async(req,res)=>{
    await registerUser.findByIdAndDelete(req.params.id,(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while deleting data..',JSON.stringify(err,undefined,2))   
    })
})

router.put('/update/:id', async(req,res)=>{

    await registerUser.findByIdAndUpdate({email:req.params.id},{$set:
        _.pick(req.body,['first_name','last_name','gender','Mobile_No','role_id']),
    },{new : true},(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while updating the data...',JSON.stringify(err,undefined,2))        
    })
} )

router.get('/download/:id',async(req,res)=>{  
   let result= await registerUser.findById({_id:req.params.id},(err,docs)=>{
       if(err){console.log(err)} 
       else{
           let path=docs.uploads[0].path;
           res.download(path)          
       }
   })  
})

module.exports=router;