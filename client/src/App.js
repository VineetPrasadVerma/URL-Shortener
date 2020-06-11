import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Typography } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'

function App () {
  const [url, setUrl] = useState('')
  const [showShortUrl, setShowShortUrl] = useState(false)
  const [shortURL, setShortURL] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    const res = await axios({
      method: 'POST',
      url: 'http://localhost:5500/',
      data: { fullURL: url },
      headers: { 'Content-type': 'application/json' }
    })

    setShowShortUrl(true)
    setShortURL(res.data.shortURL)
    setUrl('')
  }

  const handleClick = async (event) => {
    const res = await axios({
      method: 'GET',
      url: shortURL,
      headers: { 'Content-type': 'application/json' }
    })

    window.open(res.data[0].fullURL)
  }

  return (
    <div className='App'>
      <Typography color='secondary' variant='h3' id='heading'>
            URL SHORTENER
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField color='secondary' style={{ width: '80%' }} type='url' variant='outlined' required label='URL' value={url} onChange={event => setUrl(event.target.value)} />
        <Button type='submit' id='shrinkButton' variant='outlined' color='secondary'>
          Shrink
        </Button>
      </form>

      {showShortUrl ? (<p id='shortUrl' onClick={handleClick}>{shortURL}</p>) : ('')}
    </div>

  )
}

export default App
