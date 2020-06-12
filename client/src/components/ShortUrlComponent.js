import React from 'react'
import { Button } from '@material-ui/core'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const ShortUrlComponent = ({ shortURL, clipboardValue, setClipboardValue }) => {
  return (
    <div id='container'>
      <a href={shortURL} target='_blank' rel='noopener noreferrer'>{shortURL}</a>
      <CopyToClipboard text={shortURL} onCopy={() => setClipboardValue('Copied')}>
        <Button id='copyButton' variant='outlined' color='secondary'>{clipboardValue}</Button>
      </CopyToClipboard>
    </div>
  )
}

export default ShortUrlComponent
