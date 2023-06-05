const test11Model = require('../../database/models/test111.model')
const { response } = require('../helper')
class Test1 {
    static addTest = async (req, res) => {
        try {
            const test = await test11Model(req.body)
            await test.save()
            response(res, 200, true, test, 'success add test1')
        } catch (e) {
            response(res, 404, true, e.message, 'not add test one')
        }
    }
}

module.exports = Test1