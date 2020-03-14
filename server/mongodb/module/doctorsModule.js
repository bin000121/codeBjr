const mongoose = require('mongoose')
var doctorsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    sex: {type: String, required: true},
    age:String,
    description: String,
    Rank:{type: String, required: true},
    tel:{type: String, required: true},
    address:String,
    idCard:{type: String, required: true},
    Treatment:[{
        type: Array,
    }],
},{
    toJSON:{virtuals:true}
})
doctorsSchema.virtual('roomName',{
    localField:'_id',
    ref:'classroom',
    foreignField:'doctors',
    justOne:false

})

const doctors = mongoose.model('doctors', doctorsSchema, 'doctors')
module.exports = doctors