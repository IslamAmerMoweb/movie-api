const mongoose = require('mongoose')
const moviesSchema = mongoose.Schema({
    listName: {
        type: String,
    },
    descList: {
        type: String
    },
    count: {
        type: Number,
    },
    imageList: {
        type: String,
        trim: true
    }
})

moviesSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    return data
}

const listModule = mongoose.model('list', moviesSchema)
module.exports = listModule