const express = require('express')
const router = express.Router()
const UrlQueries = require('../controllers/UrlController')

router.get('/', UrlQueries.readUrl)

module.exports = router
