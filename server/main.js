// 基本引用
const express = require('express')
const path=require('path')
const db = require('./mongodb/connect.js')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')

const auth=require('./middleware/auth.js')({jwt,module:'admin'})
app.set('key','bjr19971029')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cors())
app.use('/public',express.static(path.join(__dirname,'./public')))
//后端路由引入
const usersRouter = require('./router/users')
const doctorsRouter = require('./router/doctors')
const classroomRouter = require('./router/classroom')
const treatmentDateRouter=require('./router/treatmentDate')
const adminRouter=require('./router/admin')
const loginRouter=require('./router/login')

// 后端路由中间件使用
app.use('/user', auth,usersRouter)
app.use('/doctors',auth, doctorsRouter)
app.use('/classroom',auth, classroomRouter)
app.use('/treatmentDate',auth, treatmentDateRouter)
app.use('/admin', auth,adminRouter)
app.use('/login', loginRouter)




//端口监听
app.listen(3001, () => {
    console.log('服务器启动成功！')
})