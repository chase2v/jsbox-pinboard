const { saveUserInfo } = require('./user')

function getAllPins(username, password, cb) {
  $http.get({
    url: 'https://' + username + ':' + password + '@api.pinboard.in/v1/posts/all?format=json',
    handler: function(resp) {
      saveUserInfo(username, password)
      
      var data = resp.data
      cb && cb(data)
    }
  })
}

function addPin(username, password, data, cb) {
  data = Object.keys(data).map(key => {
    if (!data[key]) return ''

    return `&${key}=${$text.URLEncode(data[key])}`
  }).join('')
  const url = 'https://' + username + ':' + password + '@api.pinboard.in/v1/posts/add?format=json'
  + data

  $http.get({
    url,
    handler: function(resp) {
      saveUserInfo(username, password)

      var data = resp.data
      cb && cb(data)
    }
  })
}

module.exports = {
  getAllPins,
  addPin,
}
