const express = require('express')
const cors = require("cors")
const app = express()
const path = require('path')
require("../database/connection")
app.use(express.static(path.join(__dirname, '../public')))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const appRouter = require('../routes/list.router')
app.use('/app', appRouter)
app.all("*", (req, res) => {
    res.status(404).send({ status: false, data: null, msg: "url is invalid" })
})

module.exports = app