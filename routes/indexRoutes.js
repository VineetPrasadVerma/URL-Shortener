const express = require('express')
const router = express.Router({ mergeParams: true })
const { readUrl, idFromShortURL } = require('../controllers/UrlController')

router.get('/', readUrl)

router.get('/:shortUrl', idFromShortURL)

module.exports = router
