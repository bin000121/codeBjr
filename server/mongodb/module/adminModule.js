const mongoose = require('mongoose')

var adminSchema = new mongoose.Schema({
    username: {required: true, type: String},
    password: {type: String,required:true}
})


const admin = mongoose.model('admin', adminSchema, 'admin')
module.exports = admin

