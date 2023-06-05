const mongoose = require('mongoose')
const bgSchema = mongoose.Schema({
    bgName: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})

bgSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    delete data._id
    return data
}

const bgModel = mongoose.model('bg', bgSchema)
module.exports = bgModel