class helper {
    static response(res, statusCode, status, data, msg) {
        res.status(statusCode).send({ status, data, msg })
    }
}

module.exports = helper