const listMenuModel = require('../../database/models/listMenu.model')
const listModel = require('../../database/models/lists.model')
const bgModel = require('../../database/models/bgUser.model')
const { response } = require('../helper')
class ListMenu {
    static addToList = async (req, res) => {
        try {
            const list = await listMenuModel.find({ _idList: req.body._idList })
            const count = await listModel.findByIdAndUpdate({ _id: req.body._idList })
            const repeated = list.find((item) => item.id == req.body.id)
            if (repeated) {
                throw new Error('repaeted id')
            } else {
                const newList = await listMenuModel(req.body)
                await newList.save()
                count.count = count.count + 1
                await count.save()
                response(res, 200, true, newList, 'success list adedd')
            }
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static allInList = async (req, res) => {
        try {
            const itemList = await listMenuModel.find({ _idList: req.params.id })
            response(res, 200, true, itemList, 'success list adedd')
        } catch (e) {
            response(res, 404, false, e.message, 'no list')
        }
    }

    static delOneItem = async (req, res) => {
        try {
            const itemList = await listMenuModel.findOneAndDelete({ _idList: req.body._id, id: req.body.id })
            const count = await listModel.findByIdAndUpdate({ _id: req.body._id })
            count.count = count.count - 1
            if (count.imageList == req.body.img) {
                count.imageList = ''
            }
            await count.save()
            response(res, 200, true, 'itemList', 'success list deleted')
        } catch (e) {
            response(res, 404, false, e.message, 'no list')
        }
    }

    static delAllItem = async (req, res) => {
        try {
            console.log(req.headers._id);
            const itemList = await listMenuModel.deleteMany({ _idList: req.headers._id })
            await bgModel.deleteMany({ id: req.headers._id })
            const count = await listModel.findByIdAndUpdate({ _id: req.headers._id })
            count.count = 0
            count.imageList = ''
            await count.save()
            response(res, 200, true, 'itemList', 'success list deleted')
        } catch (e) {
            response(res, 404, false, e.message, 'no list')
        }
    }
}

module.exports = ListMenu