require('express-async-errors')
const rolesFile=require('../Controllers/roleController')
const registrationUser=require('../Controllers/registrations')
const userInformation=require('../Controllers/userInformationContoller')
const logins=require('../Controllers/LoginController')
const error=require('../Middleware/error')
const fileUpload=require('../Controllers/fileupload')
const roleAssignment=require('../Controllers/RoleAssignment')
const empAttendance=require('../Controllers/EmployeeAttendance')
module.exports=function(app){
    app.use('/role',rolesFile)
    app.use('/register',registrationUser)
    app.use('/info',userInformation)
    app.use('/login', logins)
    app.use('/file',fileUpload)
    app.use('/userRole',roleAssignment)
    app.use('/attendance',empAttendance)
    app.use(error)
}