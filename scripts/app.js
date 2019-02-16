require('./render-welcome.js')
const renderAddPin = require('./render-add-pin.js')
const {
  isShare,
} = require('./utils')

$app.autoKeyboardEnabled = true
$app.rotateDisabled = true
$app.keyboardToolbarEnabled = true

const token = $cache.get('token') || ''

function launch() {
  if (token && isShare()) {
    renderAddPin()
  }
}

module.exports = {
  launch
}
