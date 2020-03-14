const express = require('express')
const classroomRouter = express.Router()
const classroomSchema = require('../mongodb/module/classroomModule')

classroomRouter.get('/info', async (req, res) => {
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let total = await classroomSchema.find({}).countDocuments()
    if (req.query.count === 'all') {
        pageSize = total
    }
    let classrooms = await classroomSchema.find({}).limit(pageSize).skip((page - 1) * pageSize).populate('doctors').sort({_id:-1}).lean()
    res.send({classrooms, total})
})
classroomRouter.get('/searchInfo', async (req, res) => {
    let searchObj = JSON.parse(req.query.searchObj)
    let condition={}
    Object.entries(searchObj).forEach(value => {
        let reg=new RegExp(value[1])
        condition[value[0]]={$regex: reg}
    })
    let classroom = await classroomSchema.find(condition).populate('doctors').sort({_id:-1}).lean()
    let total = await classroomSchema.find(condition).countDocuments()
    res.send({classroom, total})
})

classroomRouter.post('/add', async (req, res) => {
    let classrooms = await classroomSchema.insertMany(req.body)
    res.send(classrooms)
})

classroomRouter.put('/update', async (req, res) => {
    let classrooms = await classroomSchema.findByIdAndUpdate({_id: req.body._id}, req.body)
    res.send(classrooms)
})

classroomRouter.delete('/delete', async (req, res) => {
    if(req.query.doctors){
        let noAssent=await classroomSchema.find({roomName:'未分配科室'}).lean()
        let newDoctorsArr=[...noAssent[0].doctors,...req.query.doctors]
        let rrr=await classroomSchema.findByIdAndUpdate({_id:noAssent[0]._id},{doctors:newDoctorsArr})
    }
    let classrooms =  await classroomSchema.findByIdAndDelete({_id:req.query._id})
    res.send(classrooms)
})
classroomRouter.delete('/deleteMany', async (req, res) => {
    let classrooms =  await classroomSchema.remove({_id:{$in:req.query.idArr}})
    res.send(classrooms)
})

module.exports = classroomRouter

