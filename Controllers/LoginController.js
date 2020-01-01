const express= require('express')
const router=express.Router();
const {registerUser}=require('../Shared/Database/registarion')
const bcrypt=require('bcryptjs')
const Joi=require('joi')

router.post('/post',async (req,res)=>{

    console.log('hiii..');
    let {error} = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let valid= await registerUser.findOne({email:req.body.email})
    if(!valid) return res.status(400).send('Email is Incorrect..')

    let passwrd=await bcrypt.compare(req.body.password,valid.password)
    if(!passwrd) return res.status(400).send('Password is Incorrect..')

    const token= valid.genrate()
    res.send(token)
})

const validate=function(user){
    const regUser={
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required()
        }
    return Joi.validate(user,regUser)
}

module.exports=router;