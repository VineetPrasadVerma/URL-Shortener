require('dotenv').config()

const express = require('express')
const path = require('path')
const connectDB = require('./config/connection')
const indexRoutes = require('./routes/indexRoutes')
const urlRoutes = require('./routes/UrlRoutes')
const app = express()

connectDB()

app.set('view engine', 'ejs')

//  parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRoutes)
app.use('/url', urlRoutes)

// console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
