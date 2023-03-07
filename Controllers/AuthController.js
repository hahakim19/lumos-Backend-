const { mongoose } = require("mongoose")
const user = require("../Models/User")
const bcrypt =require('bcrypt')
const {ErrorHandler}= require("../Utils/error.js")
require('dotenv').config()
const jwt = require('jsonwebtoken')

////////////////////////////////////////////////////// jwt creation of the token 

const createwebtoken = (id) => {

    return jwt.sign({ id },process.env.JWT, { expiresIn: 60 * 60 * 24 });
    

}


//////////////////////////////////////////////////////////////////////////////

const inscription = async(req,res,next)=>{

    const {Firstname,Lastname,Email,Password,username} = req.body

  


    try{ 
        let salt = await bcrypt.genSalt();
        let Passwordhashed = await bcrypt.hash(Password,salt) 

   const newUser = new user({
        Firstname,
        Lastname,
        Email,
        Password:Passwordhashed,
        username
    }) 
        await newUser.save()
        res.status(200).send('ok my arms are good ')
    }
    catch(err)
    {
        next(err)
    }

}

const login = async (req,res,next)=>{

  const {username,Password}=req.body
  
console.log('dooo',Password)


  try{
    

   let auth = await user.where('username',username)
console.log(auth);

 
   

   
   let dbPassword= auth[0].Password
   
   let token = createwebtoken(auth[0]._id)


      let Passwordhashed = await bcrypt.compare(Password,dbPassword) 
       
     
   if (Passwordhashed)
    {

        res.cookie('jwt',token,{ httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).json({message:"hello"})

     } 
  
    else {res.json({message:'password incorrect '})}
   
  }
  catch(err)
  {
    next(err)
  }
}

//18696165











module.exports={inscription,login}