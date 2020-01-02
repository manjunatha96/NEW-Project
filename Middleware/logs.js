require('winston-mongodb')
const winston=require('winston')
const UR=require('../config/config')
module.exports=function(){
    winston.add(winston.transports.File,{filename:"logfile.log"})
    winston.add(winston.transports.MongoDB,{db:UR.DB_URL,
    level:'info'
    })
    
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, prettyPrint:true}),
        new winston.transports.File({filename:'uncaughtException.log'}))
    
    process.on('unhandledRejection',(ex)=>{
       throw ex;
    })
    // throw new Error('something happended while starting server..')
    //const p= Promise.reject(new Error('unhandaled promise rejection...'))
    //p.then(console.log('done'))
}