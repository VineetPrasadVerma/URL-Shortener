const ShortURL = require('../models/shortURL')
const shortURLGenerator = require('../services/shortURLGenerator')

const shortURLQueries = {}

shortURLQueries.readShortURL = async (req, res) => {
  try {
    const shortURLs = await ShortURL.find()
    res.render('index', { shortURLs: shortURLs })
  } catch (e) {
    console.log(e)
  }
}

shortURLQueries.createShortURL = async (req, res) => {
  try {
    const fullURL = req.body.fullURL

    const timeStamp = Date.now()
    const shortURL = shortURLGenerator.idToShortURL(timeStamp)

    const data = await ShortURL.create({ _id: timeStamp, fullURL: fullURL, shortURL: shortURL })

    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
}

shortURLQueries.idFromShortURL = async (req, res) => {
  try {
    // const id = shortURLGenerator.shortURLToId(req.params.shortURL)
    // console.log(id)
    const shortURL = await ShortURL.findOne({ shortURL: req.params.shortURL })
    shortURL.clicks++
    shortURL.save()

    res.redirect(shortURL.fullURL)
  } catch (error) {

  }
}
module.exports = shortURLQueries
