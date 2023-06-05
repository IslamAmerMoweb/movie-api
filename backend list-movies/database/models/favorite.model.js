const mongoose = require('mongoose')
const favoriteSchema = mongoose.Schema({
    favoriteName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    },
    poster_path: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    rate: { type: Number }
})

const favoriteModel = mongoose.model('favorite', favoriteSchema)
module.exports = favoriteModel