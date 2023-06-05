const favoriteModel = require('../../database/models/favorite.model')
const { response } = require('../helper')

class Favorite {
    static addFavorite = async (req, res) => {
        try {
            const list = await favoriteModel.find({ id: req.body.id, favoriteName: req.body.favoriteName })
            if (list.length == 0) {
                const newList = await favoriteModel(req.body)
                if (req.body.rate > 0) {
                    newList.rate = req.body.rate
                } else {
                    newList.rate = 0
                }
                await newList.save()
                response(res, 200, true, newList, 'adedd success')
            } else {
                response(res, 200, false, 'list not adedd')
            }
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static showFavorite = async (req, res) => {
        try {
            const list = await favoriteModel.find()
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static delAllFavorite = async (req, res) => {
        try {
            const list = await favoriteModel.deleteMany()
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static delOneFavorite = async (req, res) => {
        try {

            const list = await favoriteModel.findByIdAndDelete({ _id: req.params.id })
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static rate = async (req, res) => {
        try {
            const rate = req.body.rate.rate
            const id = req.body.rate._id
            const list = await favoriteModel.findOne({ id: id })
            list.rate = rate
            await list.save()
            console.log(list);
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static showRate = async (req, res) => {
        try {
            const list = await favoriteModel.find()
            const rate = list.filter((el) => el.rate > 0)
            console.log(rate);
            response(res, 200, true, rate, 'all rate')
        } catch (e) {
            response(res, 404, false, e.message, 'rate')
        }
    }
}

module.exports = Favorite