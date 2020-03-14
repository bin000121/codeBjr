const express=require('express')
const adminRouter=express.Router()
const adminSchema=require('../mongodb/module/adminModule')

adminRouter.get('/info',async(req,res)=>{
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let admins=await adminSchema.find({}).limit(pageSize).skip((page - 1) * pageSize).sort({_id:-1}).lean()
    let total = await adminSchema.find({}).countDocuments()
    res.send({admins,total})
})
adminRouter.get('/searchInfo',async(req,res)=>{
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let searchObj = JSON.parse(req.query.searchObj)
    let condition={}
    Object.entries(searchObj).forEach(value => {
        let reg=new RegExp(value[1])
        condition[value[0]]={$regex: reg}
    })
    let admins = await adminSchema.find(condition).limit(pageSize).skip((page - 1) * pageSize).sort({_id:-1}).lean()
    let total = await adminSchema.find(condition).countDocuments()
    res.send({admins,total})
})

adminRouter.post('/add',async(req,res)=>{
    let admins=await adminSchema.insertMany(req.body)
    res.send(admins)
})

adminRouter.put('/update', async (req, res) => {
    let admins = await adminSchema.findByIdAndUpdate({_id: req.body._id}, req.body)
    res.send(admins)
})

adminRouter.delete('/delete', async (req, res) => {
    let admins = await adminSchema.findByIdAndDelete({_id:req.query._id})
    res.send(admins)
})

adminRouter.delete('/deleteMany', async (req, res) => {
    let admins =  await adminSchema.remove({_id:{$in:req.query.idArr}})
    res.send(admins)
})

module.exports=adminRouter