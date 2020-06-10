const mongoose = require('mongoose')

const UrlSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  fullURL: {
    type: String,
    required: true
  },
  code: {
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

module.exports = mongoose.model('Url', UrlSchema)
