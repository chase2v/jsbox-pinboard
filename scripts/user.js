function saveUserInfo(token = '') {
  $cache.set('token', token)
  $cache.set('username', token.split(':')[0] || '')
}

module.exports = {
  saveUserInfo
}