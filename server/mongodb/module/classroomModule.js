const mongoose = require('mongoose')

var classroomSchema = new mongoose.Schema({
    roomName: {required: true, type: String},
    doctors: [{type: mongoose.SchemaTypes.ObjectId, ref: 'doctors'}],
})


const classrooms = mongoose.model('classroom', classroomSchema, 'classroom')
module.exports = classrooms

