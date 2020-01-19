const mongoose=require('mongoose')
const Joi=require('joi')
const Schema = mongoose.Schema;
const registerUser  = require('../Database/registarion')
const userRoles=mongoose.Schema({
    user_id:{ type: mongoose.Schema.ObjectId, ref: 'user_register' },
    admin:{
        type:Boolean,
        default:false
         },
    superuser:{
        type:Boolean,
        default:false
        },
    created_date:{
        type:Date,
        default:Date.now
    }
})

const userRole=mongoose.model('userRoleAssignment',userRoles)

module.exports.userRole=userRole;