const mongoose = require('mongoose')

const URI = 'mongodb://localhost/url-shortener'

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log('MongoDB started')
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDB
