const mongoose = require('mongoose')
var usersSchema = new mongoose.Schema({
    name: {type: String, required: true},
    tel: {type: String, required: true},
    sex: {type: String, required: true},
    idCard: {type: String, required: true},
    nation:String,
    age: {type: Number }
})
const users=mongoose.model('users', usersSchema,'users')
module.exports = users