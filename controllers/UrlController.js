const Url = require('../models/Url')
const shortURLGenerator = require('../Utils/shortURLGenerator')

const UrlQueries = {}

UrlQueries.readUrl = async (req, res) => {
  try {
    const Urls = await Url.find()
    return res.render('index', { Urls })
  } catch (e) {
    console.log(e)
    return res.render('error', { error: { status: 500, message: 'Server Error' } })
  }
}

UrlQueries.createShortURL = async (req, res) => {
  try {
    const fullURL = req.body.fullURL

    const timeStamp = Date.now()
    const shortUrlCode = shortURLGenerator.idToShortURL(timeStamp)

    // const fetchedUrl = Url.findOne({ fullURL })
    // if (fetchedUrl) {
    //   res.redirect('/')
    // }

    const newUrl = await Url.create({ _id: timeStamp, fullURL, shortURL: shortUrlCode })
    res.redirect('/')
  } catch (e) {
    console.log(e)
    return res.render('error', { error: { status: 500, message: 'Server Error' } })
  }
}

UrlQueries.idFromShortURL = async (req, res) => {
  try {
    // const id = shortURLGenerator.shortURLToId(req.params.shortURL)
    // console.log(id)

    const url = await Url.findOne({ shortURL: req.params.shortUrl })

    if (!url) {
      return res.render('error', { error: { status: 404, message: 'Page not found' } })
    }

    url.clicks++
    url.save()

    res.redirect(url.fullURL)
  } catch (error) {
    console.log(error)
    return res.render('error', { error: { status: 500, message: 'Server Error' } })
  }
}
module.exports = UrlQueries
