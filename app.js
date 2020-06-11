require('dotenv').config()

const express = require('express')
const { MongoClient } = require('mongodb')
const shortURLGenerator = require('./utils/shortURLGenerator')
const app = express()

let db

const connectDB = async () => {
  const client = new MongoClient(process.env.DATABASE_URL, { useUnifiedTopology: true })

  try {
    await client.connect()
    db = client.db('url-shortener')
    console.log(`Connected to database ${db.databaseName}`)
  } catch (ex) {
    console.error(`Something bad happend ${ex}`)
    // res.status(500).json({ message: 'can\'t connect to Database' })
  } finally {
    // client.close()
  }
}

connectDB()

app.use(express.json())

app.get('/:code', async (req, res) => {
  try {
    const collection = db.collection('urls')
    const searchCursor = await collection.find({ code: req.params.code })
    const result = await searchCursor.toArray()

    if (result === []) res.status(404).json('Url not found')
    return res.status(200).json(result)
  } catch (ex) {
    return res.status(500).json({ message: 'Can\'t fetch url' })
  }
})

app.post('/', async (req, res) => {
  try {
    const fullURL = req.body.fullURL

    const timeStamp = Date.now()
    const shortUrlCode = shortURLGenerator.idToShortURL(timeStamp)

    const collection = db.collection('urls')
    const insertCursor = await collection.insertOne({
      _id: timeStamp,
      fullURL,
      code: shortUrlCode,
      shortURL: `${process.env.BASE_URL}${process.env.PORT}/${shortUrlCode}`
    })
    console.log(insertCursor.insertedCount)
  } catch (ex) {
    res.status(500).json({ message: 'Can\'t generate short url' })
  }
})

// console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
