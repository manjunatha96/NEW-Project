const express=require('express');
const router=express.Router();
const {registerUser,validate}=require('../Shared/Database/registarion')
const _=require('lodash')
const { role }= require('../Shared/Database/role');
const bcrypt=require('bcryptjs')

router.get('/get',async(req,res)=>{
    const result=await registerUser.find()
    .populate('role')
    res.send(result)
})

router.post('/post',async(req,res)=>{
    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const valid=await registerUser.findOne({email:req.body.email})
    if(valid) res.status(400).send('Email already exits..')

    let result= await new registerUser(_.pick(req.body,['first_name','last_name','gender','Mobile_No','email','password','role_id']))

    const salt= await bcrypt.genSalt(10)
    result.password= await bcrypt.hash(result.password,salt)

    await result.save((err,docs)=>{
        if(!err) res.send(_.pick(result,['_id','first_name','last_name','gender','Mobile_No','email','role_id']))
        else console.error('Error while sendinf the data...',JSON.stringify(err,undefined,2))        
    })
})

router.put('/update/:id', async(req,res)=>{

    await registerUser.findByIdAndUpdate({_id:req.params.id},{$set:
        _.pick(req.body,['first_name','last_name','gender','Mobile_No','role_id']),
    },{new : true},(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while updating the data...',JSON.stringify(err,undefined,2))        
    })
} )


module.exports=router;