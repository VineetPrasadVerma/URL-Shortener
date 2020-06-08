const express = require('express')
const router = express.Router({ mergeParams: true })
const shortURL = require('../controllers/shortURLController')

router.get('/', shortURL.readShortURL)

router.post('/shortURL', shortURL.createShortURL)

router.get('/:shortURL', shortURL.idFromShortURL)

module.exports = router
