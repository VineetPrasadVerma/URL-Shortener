require('dotenv').config()

const express = require('express')
const path = require('path')
const connectDB = require('./config/connection')
const indexRoutes = require('./routes/indexRoutes')
// const cors = require('cors')
const app = express()

connectDB()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
// app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
