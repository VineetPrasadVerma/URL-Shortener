import React, { useState } from 'react'
import FullUrlComponent from './components/FullUrlComponent'
import ShortUrlComponent from './components/ShortUrlComponent'

function App () {
  const [clipboardValue, setClipboardValue] = useState('')
  const [showShortUrl, setShowShortUrl] = useState(false)
  const [shortURL, setShortURL] = useState('')

  // const handleClick = async (event) => {
  // const res = await axios({
  //   method: 'GET',
  //   url: shortURL,
  //   headers: { 'Content-type': 'application/json' }
  // })

  // window.open(shortURL)
  // }
  return (
    <div className='App'>
      <FullUrlComponent setShowShortUrl={setShowShortUrl} setShortURL={setShortURL} setClipboardValue={setClipboardValue}> </FullUrlComponent>
      {showShortUrl ? (<ShortUrlComponent shortURL={shortURL} clipboardValue={clipboardValue} setClipboardValue={setClipboardValue} />) : ('')}
    </div>
  )
}

export default App
