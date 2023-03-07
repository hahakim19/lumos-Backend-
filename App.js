require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const{ mongoose }= require('mongoose')
const Route = require('./Routes/Recipie')
const UserAuth = require('./Routes/User')
const app = express()

app.use(express.json())


//sudo service mongod start

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    // listen for requests

    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })




app.use(cookieParser())


app.use(UserAuth)
app.use(Route)

//4LHQWw4geXKUQDeR



  app.use((err,req,res,next)=>{

    const errorStatus = err.status || 500 ; 
    const errMessage = err.message || 'something is wrong !';
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errMessage,
        stack:err.stack,
    
    }) 
    
    })