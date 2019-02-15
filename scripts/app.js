require('./render-welcome.js')
const renderAllPins = require('./render-all-pins.js')

var username = $cache.get('username') || ''
var password = $cache.get('password') || ''

if (username && password) {
  renderAllPins(username, password)
} else {
  require('./render-login.js')
}
