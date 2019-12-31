const mongoose=require('mongoose');
const Joi=require('joi')

const userDeatils= mongoose.model('User_Details',new mongoose.Schema({
    full_name:{
        type:String,
        minlength:5,
        maxlength:50,
        require:true
    },
    gender:{
        type:String
    },
    Mobile_No:{
        type:String,
        minlength:10,
        maxlength:20,
        require:true
    },
    email:{
        type:String,
        minlength:5,
        maxlength:255,
        require:true,
        unique:true
    },
    Address_line1:{
        type:String,
        minlength:5,
        maxlength:255,
        require:true
    },
    Address_line2:{
        type:String,
        minlength:5,
        maxlength:255,
        require:true
    },
    city:{
        type:String,
        minlength:3,
        maxlength:50,
        require:true
    },
    state:{
        type:String,
        minlength:3,
        maxlength:50,
        require:true
    },
    country:{
        type:String,
        minlength:3,
        maxlength:50,
        require:true
    },
    Postel_Code:{
        type:Number,
        minlength:3,
        maxlength:10,
        require:true
    },
    is_active:{
        type:Boolean,
        default:true
    },
    created_date:{
        type:Date,
        default:Date.now
    }
}))

const validateRegistration=function(user){
    const regUser={
        full_name:Joi.string().min(5).max(50).required(),
        gender:Joi.string().required(),
        Mobile_No:Joi.string().min(10).max(20).required(),
        email:Joi.string().min(5).max(255).required().email(),
        Address_line1:Joi.string().min(5).max(255).required(),
        Address_line2:Joi.string().min(5).max(255).required(),
        city:Joi.string().min(3).max(50).required(),
        state:Joi.string().min(3).max(50).required(),
        country:Joi.string().min(3).max(50).required(),
        Postel_Code:Joi.string().min(3).max(10).required(),
        }
    return Joi.validate(user,regUser)
}

module.exports.validate=validateRegistration;
module.exports.userDeatils=userDeatils;