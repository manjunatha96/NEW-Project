const express=require('express');
const router=express.Router();
const {userDeatils, validate }= require('../Shared/Database/userInformation')
const _=require('lodash')

router.get('/get',async (req,res)=>{
    const result=await userDeatils.find()
    res.send(result)
})
router.get('/get/:id',async (req,res)=>{
    const result=await userDeatils.findById(req.params.id)
    res.send(result)
})

router.post('/post', async(req,res)=>{
    
    const {error}= validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const valid=await userDeatils.findOne({email:req.body.email})
    if(valid) res.status(400).send('Email already exits..')

    let result= await new userDeatils(_.pick(req.body,['full_name','gender','Mobile_No','email','Address_line1','Address_line2','city','state','country','Postel_Code']))

    await result.save((err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while sendinf the data...',JSON.stringify(err,undefined,2))        
    })

})

router.put('/update/:id',async(req,res)=>{

    const result=await userDeatils.findByIdAndUpdate({_id:req.params.id},{$set:
        _.pick(req.body,['full_name','gender','Mobile_No','email','Address_line1','Address_line2','city','state','country','Postel_Code'])
    },{new:true},(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while updating the data...',JSON.stringify(err,undefined,2))        
    })
})

router.delete('/delete/:id',async(req,res)=>{

    await userDeatils.findByIdAndDelete(req.params.id,(err,docs)=>{
        if(!err) res.send(docs)
        else console.error('Error while deleting the data...',JSON.stringify(err,undefined,2))        
    })
})

module.exports=router;