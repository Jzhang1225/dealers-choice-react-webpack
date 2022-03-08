const router = require('express').Router()
const { People } = require('./db/db')

router.get('/', async(req, res, next) =>{
    try{
        res.send(await People.findAll())
    }
    catch(e){
        next(e)
    }
})

router.post('/', async(req, res, next)=>{
    try{
        res.send(await People.randomPerson())
    }
    catch(e){
        next(e)
    }
})

module.exports = router