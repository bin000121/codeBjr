const express = require('express')
const app=express()
const loginRouter = express.Router()
const adminSchema = require('../mongodb/module/adminModule')
const jwt =  require('jsonwebtoken')



loginRouter.post('/login', async (req, res) => {
    let {username, password} = req.body
    let user = await adminSchema.findOne({username}).lean()
    // 先校验账户名
    if (!user) {
        res.status(422).send({msg: '用户名不存在！'})
    } else if (password !== user.password) { // 账户名正确，再校验密码
        return res.status(422).send({msg: '密码有误！'})
    }
    // 账户和密码都通过，返回token
    let token = jwt.sign({
        id: user._id,
        username:user.username,
        exp:new Date().getTime()+1000*60*60*24
    }, req.app.get('key'))
    res.send(token)
})
loginRouter.post('/register',async(req,res)=>{
    let register=await adminSchema.insertMany(req.body)
    console.log(register)
    let token = jwt.sign({
        id: register._id,
        username:register.username ,
        exp:new Date().getTime()+1000*60*60*24
    }, req.app.get('key'))
    res.send(token)
})
module.exports = loginRouter
