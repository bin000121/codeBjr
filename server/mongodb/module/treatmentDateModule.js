const mongoose = require('mongoose')
var treatmentDateSchema = new mongoose.Schema({
    value: {type: String, required: true},
    label: String,
    children: {
        type: Array,
        default: [{
            value: 'b1',
            label: '是VIP',
            children: [
                {value: 'c1', label: '上午'},
                {value: 'c2', label: '下午'},
            ]
        }, {
            value: 'b2',
            label: '非VIP',
            children: [
                {value: 'c1', label: '上午'},
                {value: 'c2', label: '下午'},
            ]
        }]
    }
})


var treatmentDateModule = mongoose.model('treatmentDate', treatmentDateSchema, 'treatmentDate')
module.exports = treatmentDateModule