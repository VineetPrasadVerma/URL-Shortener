const shortURLGenerator = require('../utils/shortURLGenerator')

const redirectToFullurl = async (req, res) => {
  try {
    const db = req.db

    const collection = db.collection('urls')
    const searchCursor = await collection.find({ code: req.params.code })
    const result = await searchCursor.toArray()

    if (result === []) res.status(404).json('Url not found')

    return res.redirect(result[0].fullURL)
    // return res.status(200).json(result)
  } catch (ex) {
    return res.status(500).json({ message: 'Can\'t fetch url' })
  }
}

const createShortUrl = async (req, res) => {
  try {
    const fullURL = req.body.fullURL
    const db = req.db

    const timeStamp = Date.now()
    const shortUrlCode = shortURLGenerator.idToShortURL(timeStamp)

    const collection = db.collection('urls')
    const insertCursor = await collection.insertOne({
      _id: timeStamp,
      fullURL,
      code: shortUrlCode,
      shortURL: `${process.env.BASE_URL}${process.env.PORT}/${shortUrlCode}`
    })

    const shortURL = insertCursor.ops[0].shortURL
    return res.status(200).json({ shortURL })
  } catch (ex) {
    res.status(500).json({ message: 'Can\'t generate short url' })
  }
}

module.exports = { createShortUrl, redirectToFullurl }
