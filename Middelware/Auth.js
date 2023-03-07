const jwt = require('jsonwebtoken')
const{ mongoose} = require('mongoose')
const user = require('../Models/User')
const {ErrorHandler} =require('../Utils/error')




const requireAuth = (req, res, next) => {

   
    const token = req.cookies.jwt 
   

    try {
        if (token) {

        jwt.verify(token,process.env.JWT, (err, decodedToken) => {

                if (err) {return next(ErrorHandler(404,'token dosent match'))}

                else {

                   
                    next()
                
                }

            })

        }

         else return next(ErrorHandler(404,'token not fund'))
         


    }

    catch (err) {

        next(err)
    }



}



const verifyUser = (req,res,next) =>{
    const token = req.cookies.jwt
    const  id=req.params.id
    try {

        if (token){
            jwt.verify(token,process.env.JWT, (err,decoded)=>{

                if (err) return next(ErrorHandler(505,'not compatible'))
                
                else {
                        if ( id===decoded.id ){
                            res.send('you can delete or update your account ')
                            next()
                        }
                   
                        else { return next(ErrorHandler(520,"you dont have the right ")) }
                   
                }
            
             })
        }
        else return next(404,'ya pas de token ')
        


    } catch (error) {
        next(error)
    }


}








module.exports = { requireAuth,verifyUser }










