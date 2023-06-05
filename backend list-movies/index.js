require('dotenv').config()
const app = require('./app/runner')
app.listen(process.env.PORT, console.log('from http://localehost:' + process.env.PORT))