const mongoose = require('mongoose')
const test1Schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    }
})

test1Schema.virtual("testing", {
    ref: "test22",
    localField: "_id",
    foreignField: "test1"
})


const test1Model = mongoose.model('test1', test1Schema)
module.exports = test1Model