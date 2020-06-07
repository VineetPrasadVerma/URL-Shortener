const mongoose = require('mongoose')

const URI = process.env.DATABASE_URL

const connectDB = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    console.log('MongoDB started')
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDB
