const mongoose=require('mongoose')
const Joi=require('joi')
const attendanceSchema=mongoose.Schema({
    userId:{type: mongoose.Schema.ObjectId, ref: 'user_register'},
        is_present:{
            type:Boolean,
            required:true
        },
        attendance_date:{
            type:Date,
            required:true
        },
        punch_in:{
            type:String
        }, 
       punch_out:{
            type:String
        },
        created_date:{
            type:Date,
            default:Date.now
        },
        last_modified_date:{
            type:Date,
            default:Date.now
        },
        is_active:{
            type:Boolean,
            default:true
        }
})

const AttendanceEmployee=mongoose.model('Employee_Attendance', attendanceSchema);

const validateAttendance=function(data){
    const valid={
        userId:Joi.string().required(),
        attendance_date:Joi.date().required(),
        is_present:Joi.boolean().required(),
        punch_in:Joi.string(),
        punch_out:Joi.string()
    }
    return Joi.validate(data,valid)
}

module.exports.AttendanceEmployee=AttendanceEmployee;
module.exports.validate=validateAttendance;