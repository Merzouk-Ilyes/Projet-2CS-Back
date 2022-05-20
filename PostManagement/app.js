const express = require('express')
const app = express()
const logger = require('morgan')
require('dotenv').config()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.port || 8001

const postRoutes = require('./routes/post')
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(port, () => {
      console.log(`app runing on port ${port}`)
    })
  )
  .catch((err) => console.log(err))

// middlwares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors())
// routes middlware
app.use(postRoutes)

//....................
