import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Typography } from '@material-ui/core'

const FullUrlComponent = ({ setShowShortUrl, setShortURL, setClipboardValue }) => {
  const [url, setUrl] = useState('')

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
    setClipboardValue('Copy')
    setUrl('')
  }

  return (
    <div>
      <Typography color='secondary' variant='h3' id='heading'>
          URL SHORTENER
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField color='secondary' style={{ width: '80%' }} type='url' variant='outlined' required label='URL' value={url} onChange={event => setUrl(event.target.value)} />
        <Button type='submit' id='shrinkButton' variant='outlined' color='secondary'>Shrink</Button>
      </form>
    </div>
  )
}

export default FullUrlComponent
