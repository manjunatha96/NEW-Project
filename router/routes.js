require('express-async-errors')
const rolesFile=require('../Controllers/roleController')
const registrationUser=require('../Controllers/registrations')
const userInformation=require('../Controllers/userInformationContoller')

module.exports=function(app){
    app.use('/role',rolesFile)
    app.use('/register',registrationUser)
    app.use('/info',userInformation)
}