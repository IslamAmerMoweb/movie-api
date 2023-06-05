const test222Model = require('../../database/models/test222.model')
const test111Model = require('../../database/models/test111.model')
const { response } = require('../helper')
class Test22 {
    static addTest = async (req, res) => {
        try {
            const test = await test222Model({
                test1: "647647cad2dd4fe380275a6c",
                ...req.body
            })
            await test.save()
            response(res, 200, true, test, 'success add test1')
        } catch (e) {
            response(res, 404, true, e.message, 'not add test one')
        }
    }

    static testing = async (req, res, next) => {
        try {
            const test1 = await test111Model.findOne({ _id: "647647cad2dd4fe380275a6c" }).populate('testing')
            // await req.try.populate("testing")
            response(res, 200, true, { test1, result: test1.testing }, 'success add test1')
        } catch (e) {
            response(res, 404, true, e.message, 'not add test one')
        }
    }
}

module.exports = Test22