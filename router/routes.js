require('express-async-errors')
require('../Middleware/logs')
const rolesFile=require('../Controllers/roleController')
const registrationUser=require('../Controllers/registrations')
const userInformation=require('../Controllers/userInformationContoller')
const logins=require('../Controllers/LoginController')
const error=require('../Middleware/error')
module.exports=function(app){
    app.use('/role',rolesFile)
    app.use('/register',registrationUser)
    app.use('/info',userInformation)
    app.use('/login', logins)
    app.use(error)
}