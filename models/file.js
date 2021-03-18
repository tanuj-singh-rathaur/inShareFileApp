const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const fileSchema = mongoose.Schema({
    filename: { type: String, required: true, },
    path: { type: String, default: true },
    size: { type: Number, default: true },
    uuid: { type: String, default: true },
    sender: { type: String, default: false },
    reciever: { type: String, default: false }

}, { Timestamp: true })


module.exports = mongoose.model('File', fileSchema)