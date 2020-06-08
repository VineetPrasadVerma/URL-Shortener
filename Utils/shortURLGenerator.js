const characterSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
const base = 62

function idToShortURL (id) {
  let shortURL = ''
  while (id > 0) {
    shortURL += characterSet[id % base]
    id = Math.floor(id / base)
  }

  return shortURL
}

function shortURLToId (url) {
  let id = 0
  for (let i = url.length - 1; i >= 0; i--) {
    id = id * base + characterSet.indexOf(url[i])
  }

  return id
}

module.exports = { idToShortURL, shortURLToId }
