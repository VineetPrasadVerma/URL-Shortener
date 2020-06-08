(function () {
  if (window.localStorage) {
    if (!window.localStorage.getItem('firstLoad')) {
      window.localStorage.firstLoad = true
      window.location.reload()
    } else { window.localStorage.removeItem('firstLoad') }
  }
})()
