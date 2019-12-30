const express=require('express');
const router=express.Router();
const _=require('lodash');
const {validate,role} =require('../Shared/Database/role')

router.get('/get',async (req,res)=>{
    const result=await role.find()
    await res.send(result)
})

router.post('/post', async(req,res)=>{
    const {error} = validate(req.body)
    if(error) res.status(400).send(error.details[0].message)

    const ress=await role.findOne({role_name:req.body.role_name})
    if(ress) res.status(400).send('This role already exits..')

    let result= await new role(_.pick(req.body,['role_name']))
    await result.save((err,docs)=>{
        if(!err) res.send(_.pick(result,['_id','role_name']))
        else console.error('Error while sendinf the data...',JSON.stringify(err,undefined,2))        
    })
})

router.put('/update/:id', async(req,res)=>{
    const ress=await role.findOne({role_name:req.body.role_name})
    if(ress) res.status(400).send('This role already exits..')

    role.findByIdAndUpdate({_id:req.params.id},{$set:
        _.pick(req.body,['role_name'])
    },{new : true},(err,docs)=>{
        if(!err)res.send(docs)
        else console.error('Error while updating role data..',JSON.stringify(err,undefined,2))      
     })
})

router.delete('/delete/:id', async(req,res)=>{
     role.findByIdAndDelete(req.params.id,(err,docs)=>{
        if(!err)res.send(docs)
        else console.error('Error while updating role data..',JSON.stringify(err,undefined,2))      
     })
})

module.exports=router;