const jwt=require('jsonwebtoken')
const config=require('config')

module.exports=function(req,res,next){
    const token=req.header('X1-login');
    if(!token) return resizeBy.status(401).send('Access denied, no token found...')

    try{
        const decode=jwt.verify(token,config.get('jwtPrivateKey'))
        req.user=decode;
        next()
    }
    catch(ex){
        res.status(400).send('invalid token..')
    }
}