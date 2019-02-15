function saveUserInfo(username, password) {
  $cache.set('username', username)
  $cache.set('password', password)
}

module.exports = {
  saveUserInfo
}