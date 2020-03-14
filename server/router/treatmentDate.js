const express=require('express')
const treatmentDateRouter=express.Router()
const treatmentDateSchema=require('../mongodb/module/treatmentDateModule')

treatmentDateRouter.get('/info',async(req,res)=>{
    let treatmentDate=await treatmentDateSchema.find({})
    res.send(treatmentDate)
})

treatmentDateRouter.post('/add',async(req,res)=>{
    let treatmentDate=await treatmentDateSchema.insertMany(req.body)
    res.send(treatmentDate)
})

module.exports=treatmentDateRouter