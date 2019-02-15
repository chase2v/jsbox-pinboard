require('./render-welcome.js')
const renderAllPins = require('./render-all-pins.js')
const renderAddPin = require('./render-add-pin.js')
const renderPageLogin = require('./render-login.js')

const username = $cache.get('username') || ''
const password = $cache.get('password') || ''

function launch() {
  const safari = $safari.items || {};
  const mode = safari && safari.location ? 'share' : 'normal'

  if (username && password) {
    if (mode === 'share') {
      renderAddPin(username, password, safari.location.href, safari.title)
    } else {
      renderAllPins(username, password)
    }
  } else {
    renderPageLogin(mode)
  }
}

module.exports = {
  launch
}
