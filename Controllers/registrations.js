const express=require('express');
const router=express.Router();
const {registerUser,validate}=require('../Shared/Database/registarion')
const _=require('lodash')

router.get('/get',async(req,res)=>{
    await res.send('geting registration page..')
})

router.post('/post',async(req,res)=>{
    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const valid=await registerUser.findOne({email:req.body.email})
    if(valid) res.status(400).send('Email already exits..')

    const result=await new registerUser(_.pick(req.body,['first_name','last_name','gender','Mobile_No','email','password','role_id']))
    
    await result.save((err,docs)=>{
        if(!err) res.send(_.pick(result,['_id','first_name','last_name','gender','Mobile_No','email']))
        else console.error('Error while sendinf the data...',JSON.stringify(err,undefined,2))        
    })
})

module.exports=router;