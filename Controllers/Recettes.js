const { mongoose } = require('mongoose')

const Recette = require('../Models/Recette')
const ErrorHandler = require('../Utils/error')
const user = require('../Models/User')

const showAll = async (req, res, next) => {

        const recette = await Recette.find()
       

        try {
                res.json(recette)


        }
        catch (err) {
                res.json('there is a promble in db')
        }




}

const addRecette = async (req, res, next) => {

        const { Title, Content } = req.body

        const id_user = req.params.id

        try {



                let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");


                if (!checkForValidMongoDbID.test(id_user)) {
                        return res.json('there is an error ')
                }






                const obj = await Recette.create({ Title, Content, id_user })


                res.json(obj)




        }
        catch (err) {


                console.log(err)

        }






}


const deleting = async (req, res, next) => {

        const { id } = req.params

        try {
                let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
                if (!checkForValidMongoDbID.test(id)) {
                        return res.json('there is an error in the type of id  ')
                }

                const obj = await Recette.findOneAndDelete({ _id: id })


                if (!obj) {
                        return res.status(404).json({ error: 'no such recipie' })
                }
                res.status(200).json(obj)


        }
        catch (err) {

                next(console.log(err))
        }

}

const updating = async (req, res, next) => {

        const id_recette = req.params.id
        const { Title, Content, id_user } = req.body

        try {
                let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
                if (!checkForValidMongoDbID.test(id_recette)) 
                {
                        return res.json('there is an error in the type of id  ')

                }


                const item= await Recette.findOneAndUpdate({_id:id_recette},{...req.body})
                res.json({item})
            
  



        }

        catch (err) {

        }


}
const showMyRecette =async(req,res,next)=>{
const {id} = req.params
try{
        let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
                if (!checkForValidMongoDbID.test(id)) 
                {
                        return res.json('there is an error in the type of id  ')

                }

      const  obj =  await Recette.find({id_user:id})

      if(!obj){
        console.log(obj)
        return  res.json('no post yet ')

        }

        res.json(obj)



}
catch(err){
console.log(err)
}


}



module.exports = { showAll, addRecette, deleting, updating,showMyRecette }

