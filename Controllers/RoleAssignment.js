const express=require('express')
const router=express.Router();
const { userRole } = require('../Shared/Database/userRole')

router.get('/get', async(req,res)=>{
    console.log('getting')    
    let result= await userRole.find()
    .populate('user_id')
    res.send(result)
})

router.post('/post', async(req,res)=>{
    console.log('posting')    
    const result= await new userRole({
        user_id:req.body.user_id,
        admin:req.body.admin,
        superuser:req.body.superuser
    })
    result.save((err,docs)=>{
        if(!err) res.send(docs)
        else console.log(err)      
    })
})

module.exports=router;