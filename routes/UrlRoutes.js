const express = require('express')
const router = express.Router({ mergeParams: true })
const UrlQueries = require('../controllers/UrlController')

router.post('/new', UrlQueries.createShortURL)

router.get('/:shortUrl', UrlQueries.idFromShortURL)

module.exports = router
