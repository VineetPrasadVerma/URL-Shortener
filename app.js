require('dotenv').config()

const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
const indexRoutes = require('./router/indexRoutes')

// Database connection code
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

const app = express()

app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  req.db = db
  next()
})

app.use('/', indexRoutes)

// console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`)
})
