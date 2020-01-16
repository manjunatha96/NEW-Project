const mongoose=require('mongoose')

const filesuploder=mongoose.Schema({
    filenames:String,
    uploads:Array,
})
const Filing=mongoose.model('FileUpload',filesuploder)

module.exports={Filing}