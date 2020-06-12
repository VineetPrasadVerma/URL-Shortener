const express = require('express')
const router = express.Router({ mergeParams: true })
const { createShortUrl, redirectToFullurl } = require('../controller/urlController')

router.get('/:code', redirectToFullurl)
router.post('/', createShortUrl)

module.exports = router
