const express=require('express');
const router=express.Router();
const { AttendanceEmployee, validate } = require('../Shared/Database/employeeAttendance')
const _=require('lodash')
router.get('/get/:id',async(req,res)=>{
    console.log('hii');
    let result=await AttendanceEmployee.findById({_id:req.params.id})
    .populate('userId')
    .select('is_present attendance_date punch_in punch_out')
    res.send(result)
})

router.get('/get/:id',async(req,res)=>{
    let result=await AttendanceEmployee.findById({_id:req.params.id})
    .populate('userId')
    res.send(result)
})

router.post('/posting', async(req,res)=>{
    
    const { error } =validate(req.body);
    if(error) res.status(401).send(error.details[0].message)

     const result= await new  AttendanceEmployee(_.pick(req.body,['userId','is_present','attendance_date','punch_in','punch_out']))
     await result.save((err,data)=>{
         if(!err) res.send(data)
         else console.log(err)         
     })
})

router.put('/update/:id', async(req,res)=>{
    console.log('hii');
    
    await AttendanceEmployee.findByIdAndUpdate({_id:req.params.id},{$set:_.pick(req.body,['punch_out','last_modified_date'])},
        {new : true},(err,docs)=>{
        if(!err)res.send(docs)
        else console.error('Error while updating role data..',JSON.stringify(err,undefined,2))      
     })
})

module.exports=router;