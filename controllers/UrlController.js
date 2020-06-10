const Url = require('../models/Url')
const shortURLGenerator = require('../utils/shortURLGenerator')

const readUrl = async (req, res) => {
  try {
    const Urls = await Url.find()
    return res.render('index', { Urls })
  } catch (e) {
    console.log(e)
    return res.render('error', { error: { status: 500, message: 'Can\'t get data' } })
  }
}

const createShortURL = async (req, res) => {
  try {
    const fullURL = req.body.fullURL
    // console.log(fullURL)
    const timeStamp = Date.now()
    const shortUrlCode = shortURLGenerator.idToShortURL(timeStamp)

    // const fetchedUrl = Url.findOne({ fullURL })
    // if (fetchedUrl) {
    //   res.redirect('/')
    // }
    // console.log(`${process.env.BASE_URL}${process.env.PORT}/${shortUrlCode}`)
    await Url.create({ _id: timeStamp, fullURL, code: shortUrlCode, shortURL: `${process.env.BASE_URL}${process.env.PORT}/${shortUrlCode}` })
    res.redirect('/')
  } catch (e) {
    console.log(e)
    return res.render('error', { error: { status: 500, message: 'Can\'t create short URL' } })
  }
}

const idFromShortURL = async (req, res) => {
  try {
    // const id = shortURLGenerator.shortURLToId(req.params.shortURL)
    // console.log(id)

    const url = await Url.findOne({ code: req.params.shortUrl })

    if (!url) {
      return res.render('error', { error: { status: 404, message: 'URL not found' } })
    }

    url.clicks++
    url.save()

    res.redirect(url.fullURL)
  } catch (error) {
    console.log(error)
    return res.render('error', { error: { status: 500, message: 'Can\'t find short URL ' } })
  }
}
module.exports = { readUrl, createShortURL, idFromShortURL }
