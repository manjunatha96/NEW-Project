const mongoose=require('mongoose')

const filesuploder=mongoose.Schema({
    fieldname: String,
    originalname: String,
    encoding: String,
    mimeptype: String,
    destination: String,
    filename: String,
    path: String,
    size: Number,
      created_date:{
        type:Date,
        default:Date.now
    }
})
const Filing=mongoose.model('FileUpload',filesuploder)

module.exports={Filing}