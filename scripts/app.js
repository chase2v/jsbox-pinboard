require('./render-welcome.js')
const renderAllPins = require('./render-all-pins.js')
const renderAddPin = require('./render-add-pin.js')
const renderPageLogin = require('./render-login.js')
const {
  isShare,
} = require('./utils')

$app.autoKeyboardEnabled = true
$app.rotateDisabled = true
$app.keyboardToolbarEnabled = true

const username = $cache.get('username') || ''
const password = $cache.get('password') || ''

function launch() {
  // if (username && password) {
  //   if (isShare()) {
      renderAddPin(username, password)
  //   } else {
  //     renderAllPins(username, password)
  //   }
  // } else {
  //   renderPageLogin(isShare)
  // }
}

module.exports = {
  launch
}
