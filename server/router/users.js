const express = require('express')
const usersRouter = express.Router()
const usersSchema = require('../mongodb/module/usersModule.js')


usersRouter.get('/info', async (req, res) => {
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let user = await usersSchema.find({}).limit(pageSize).skip((page - 1) * pageSize).sort({_id:-1})
    let total = await usersSchema.find({}).countDocuments()
    res.send({user, total})
})

usersRouter.get('/searchInfo', async (req, res) => {
    let page = parseInt(req.query.page || 1)
    let pageSize = parseInt(req.query.pageSize || 10)
    let searchObj = JSON.parse(req.query.searchObj)
    let condition={}
    Object.entries(searchObj).forEach(value => {
        let reg = new RegExp(value[1])
        condition[value[0]] = {$regex: reg}
    })
    let user = await usersSchema.find(condition).limit(pageSize).skip((page - 1) * pageSize).sort({_id:-1})
    let total = await usersSchema.find(condition).countDocuments()
    res.send({user,total})
})

usersRouter.post('/add', async (req, res) => {
    let user = await usersSchema.insertMany(req.body)
    res.send(user)
})

usersRouter.put('/update', async (req, res) => {
    let user = await usersSchema.findByIdAndUpdate({_id: req.body._id}, req.body)
    res.send(user)
})

usersRouter.delete('/delete', async (req, res) => {
    let user = await usersSchema.findByIdAndDelete({_id: req.query._id})
    res.send(user)
})

usersRouter.delete('/deleteMany', async (req, res) => {
    let user = await usersSchema.deleteMany({_id: {$in: req.query.idArr}})
    res.send(user)
})
module.exports = usersRouter