require('dotenv').config()

const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
