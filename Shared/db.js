const mongoose=require('mongoose');
const winston=require('winston')
const config=require('../config/config')
module.exports=function(){
    mongoose.connect(config.DB_URL,{useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true})
    .then(()=>winston.info('Database connected successfully..'))
}