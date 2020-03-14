const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hospitalItem', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('数据库链接成功!')
})
module.exports = db