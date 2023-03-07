const express = require('express')


///// espace dedier pour les controller 

const {inscription,login} = require ('../Controllers/AuthController')

const router = express.Router()


router.get('/')
router.patch('/signUp',inscription)
router.patch('/login',login)





module.exports = router