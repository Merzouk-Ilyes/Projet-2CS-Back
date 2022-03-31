const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
require('dotenv').config()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const authRoutes = require('./routes/auth')

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('database connected'))
  .catch((err) => console.log(err))

//////////////// middlwares
app.use(logger('dev'))
app.use(bodyParser.json())

/////////// routes middlware

app.use(authRoutes)

///////////////////////////......

const port = process.env.port || 8000

app.listen(port, () => {
  console.log(`app runing on port ${port}`)
})
