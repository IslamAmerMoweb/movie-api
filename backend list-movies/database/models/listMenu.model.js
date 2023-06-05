const mongoose = require('mongoose')
const listMenuSchema = mongoose.Schema({
    _idList: {
        type: String,
        required: true
    },
    poster_path: { type: String },
    id: {
        type: String,
        trim: true,
    },
    overview: {
        type: String
    }
})

listMenuSchema.methods.toJSON = function () {
    const data = this.toObject()
    delete data.__v
    delete data._id
    delete data._idList
    return data
}

const listMenuModel = mongoose.model('listMenu', listMenuSchema)
module.exports = listMenuModel