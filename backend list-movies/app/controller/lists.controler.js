const listModule = require('../../database/models/lists.model')
const { response } = require('../helper')
const listMenuModel = require('../../database/models/listMenu.model')
const ObjectId = require('mongoose').Types.ObjectId;

class List {
    static addList = async (req, res) => {
        try {
            const list = await listModule(req.body)
            list.count = 0
            await list.save()
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static showList = async (req, res) => {
        try {
            const list = await listModule.find()
            response(res, 200, true, list, 'success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static delAllList = async (req, res) => {
        try {
            const list = await listModule.deleteMany()
            await listMenuModel.deleteMany()
            response(res, 200, true, [], 'deleted success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static delOneList = async (req, res) => {
        try {
            const list = await listModule.deleteOne({ _id: req.body })
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static addToList = async (req, res) => {
        try {
            const list = await listModule(req.body)
            await list.save()
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }

    static editList = async (req, res) => {
        try {
            const list = await listModule.findByIdAndUpdate(req.body._id, {
                listName: req.body.listName,
                descList: req.body.descList
            })
            await list.save()
            response(res, 200, true, list, 'adedd success')
        } catch (e) {
            response(res, 404, false, e.message, 'list not adedd')
        }
    }
}

module.exports = List