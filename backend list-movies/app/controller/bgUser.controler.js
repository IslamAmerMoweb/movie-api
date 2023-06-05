const bgModel = require('../../database/models/bgUser.model')
const listModel = require('../../database/models/lists.model')
const { response } = require('../helper')
class Bg {
    static addBg = async (req, res) => {
        try {
            const bgUser = await bgModel.findOne({ id: req.body.bg.id })
            const listImg = await listModel.findByIdAndUpdate({ _id: req.body.bg.id })
            listImg.imageList = req.body.bgList
            await listImg.save()
            if (bgUser == null) {
                const newBg = await bgModel(req.body.bg)
                newBg.save()
                response(res, 200, 'success', newBg, 'bg adedd')
            } else {
                const bgUser = await bgModel.findOneAndUpdate({ id: req.body.bg.id, bgName: req.body.bg.bgName })
                await bgUser.save()
                response(res, 200, 'success', bgUser, 'bg adedd')
            }
            // await bgUser.save()
        } catch (e) {
            response(res, 404, 'success', e.message, 'bg not adedd')
        }
    }

    static getBg = async (req, res) => {
        try {
            const bgUser = await bgModel.find({ id: req.params.id })
            response(res, 200, 'success', ...bgUser, 'bg')
        } catch (e) {
            response(res, 404, 'false', e, 'bg not adedd')
        }
    }
}

module.exports = Bg