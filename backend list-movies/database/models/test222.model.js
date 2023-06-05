const mongoose = require('mongoose')
const test22Schema = mongoose.Schema({
    test1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lastName",
        required: true
    },
    country: {
        type: String,
        required: true
    },
    street: {
        type: String
    }
})



const test1Model = mongoose.model('test22', test22Schema)
module.exports = test1Model