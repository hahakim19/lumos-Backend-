const express = require('express')


///// espace dedier pour les controller 

const  {showAll,addRecette,deleting,updating,showMyRecette} = require('../Controllers/Recettes')
const { requireAuth } = require('../Middelware/Auth')

const router = express.Router()

router.get('/recettes/:id',showMyRecette)  

router.patch('/recettes/:id',requireAuth,addRecette)

router.get('/recettes',showAll)

router.delete('/deleting/:id',requireAuth,deleting)

router.patch('/updating/:id',requireAuth,updating)








module.exports = router