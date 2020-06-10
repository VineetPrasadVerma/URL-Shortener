const express = require('express')
const router = express.Router()
const { createShortURL } = require('../controllers/UrlController')

router.post('/new', createShortURL)

module.exports = router
