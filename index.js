const express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

const user = require('./routes/user-route')
const place = require('./routes/place-route')

app.use('/api/login', user)
app.use('/api/place', place)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})