
const express = require('express')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

const router = require('./routes/index')

const PORT = process.env.PORT || 4001

const app = express()


app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/timer', router)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})