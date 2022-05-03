const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
require('dotenv').config()
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err))

// middlwares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
// routes middlware

app.use(authRoutes)
app.use(userRoutes)

//....................

const port = process.env.port || 8000

app.listen(port, () => {
  console.log(`app runing on port ${port}`)
})
