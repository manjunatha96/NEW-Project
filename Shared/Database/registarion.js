const mongoose=require('mongoose')
const Joi=require('joi');
let role=require('./role')
const jwt=require('jsonwebtoken')
const config=require('config');
const registerSchema=mongoose.Schema({
    first_name:{
        type:String,
        minlength:5,
        maxlength:50,
        require:true
    },
    last_name:{
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
    password:{
        type:String,
        minlength:5,
        maxlength:1024,
        require:true
    },
    role_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
    },
    created_date:{
        type:Date,
        default:Date.now
    },
    is_active:{
        type:Boolean,
        default:true
    },
    isAdmin:Boolean
})

registerSchema.methods.genrate= function (){
    return jwt.sign({_id:this._id,first_name:this.first_name,isAdmin:this.isAdmin },config.get('jwtPrivateKey'))
}

const registerUser=mongoose.model('user_register', registerSchema)
const validateRegistration=function(user){
    const regUser={
        first_name:Joi.string().min(5).max(50).required(),
        last_name:Joi.string().min(5).max(50).required(),
        gender:Joi.string().required(),
        Mobile_No:Joi.string().min(10).max(20).required(),
        email:Joi.string().min(5).max(255).required().email(),
        password:Joi.string().min(5).max(1024).required(),
        role_id:Joi.string().required()
        }
    return Joi.validate(user,regUser)
}

module.exports.validate=validateRegistration;
module.exports.registerUser=registerUser;