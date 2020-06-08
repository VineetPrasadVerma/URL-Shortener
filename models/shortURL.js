const mongoose = require('mongoose')

const shortURLSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  fullURL: {
    type: String,
    required: true
  },
  shortURL: {
    type: String,
    required: true
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  }
})

module.exports = mongoose.model('ShortURL', shortURLSchema)
