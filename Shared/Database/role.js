const mongoose=require('mongoose');
const Joi=require('joi')

const roleSchema=mongoose.Schema({
    role_name:{
        type:String,
        minlength:5,
        maxlength:50,
        require:true,
        unique:true
    },
    is_active:{
        type:Boolean,
        default:true
    },
    created_date:{
        type:Date,
        default:Date.now
    }
})
const role=mongoose.model('Role',roleSchema)

const validateRole=function(rolz){
    const roles={
        role_name:Joi.string().min(5).max(50).required()
    }
    return Joi.validate(rolz,roles)
}

module.exports.validate=validateRole;
module.exports.role=role;