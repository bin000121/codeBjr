const express=require('express')
const doctorsRouter=express.Router()
const doctorsSchema=require('../mongodb/module/doctorsModule')
const classroomSchema = require('../mongodb/module/classroomModule')

doctorsRouter.get('/info',async (req,res)=>{
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let doctors = await doctorsSchema.find({}).limit(pageSize).skip((page - 1) * pageSize).populate('roomName').sort({_id:-1}).lean()
    let total = await doctorsSchema.find({}).countDocuments()
    res.send({doctors, total})
})
doctorsRouter.get('/searchInfo',async (req,res)=>{
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let searchObj = JSON.parse(req.query.searchObj)
    let condition={}
    Object.entries(searchObj).forEach(value => {
        let reg=new RegExp(value[1])
        condition[value[0]]={$regex: reg}
    })
    let doctors = await doctorsSchema.find(condition).limit(pageSize).skip((page - 1) * pageSize).populate('roomName').sort({_id:-1}).lean()
    let total = await doctorsSchema.find(condition).countDocuments()
    res.send({doctors, total})
})

doctorsRouter.post('/add', async (req, res) => {
    let doctors = await  doctorsSchema.insertMany(req.body)
    let roomNameId=doctors[0].roomName[0]._id
    let classroomInfo=await classroomSchema.find({_id:roomNameId})
    let doctorsArr=classroomInfo[0].doctors
    doctorsArr.push(doctors[0]._id)
    let classroomAdd=await classroomSchema.updateMany({_id:roomNameId},{doctors:doctorsArr})
    res.send(doctors)
})

doctorsRouter.put('/update', async (req, res) => {
    let oldId=req.body.choseRoomNameId.oldId||null
    let doctorId=req.body.choseRoomNameId.doctorId||null
    let newId=req.body.choseRoomNameId.newId||null
    let indexInDoctors=req.body.choseRoomNameId.indexInDoctors||null
    if (newId&&oldId!==newId) {//如果科室的id不一样，那就是要做更换科室操作
        let oldArr=await classroomSchema.find({_id:oldId}).lean()//取回原科室下的下属医生列表
        oldArr[0].doctors.splice(parseInt(indexInDoctors),1)//删除原下属医生列表中该医生的id
        let updateOldDoctors=await classroomSchema.findByIdAndUpdate({_id:oldId},{doctors:oldArr[0].doctors})//更新旧科室下属医生
        let newArr=await classroomSchema.find({_id:newId}).lean()//取新科室下的下属医生列表
        newArr[0].doctors.push(doctorId)//向新科室的下属医生列表添加该医生id
        let updateNewDoctor=await classroomSchema.findByIdAndUpdate({_id:newId},{doctors:newArr[0].doctors})//更新新科室下属医生
    }
    let doctors = await doctorsSchema.findByIdAndUpdate({_id:req.body._id},req.body).populate('roomName')
    res.send(doctors)
})
doctorsRouter.delete('/delete', async (req, res) => {
    let doctors = await doctorsSchema.findByIdAndDelete({_id:req.query._id})
    res.send(doctors)
})
doctorsRouter.delete('/deleteMany', async (req, res) => {
    let doctors = await doctorsSchema.deleteMany({_id:{$in:req.query.idArr}})
    res.send(doctors)
})

module.exports=doctorsRouter