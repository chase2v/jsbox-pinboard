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

module.exports = {
  getAllPins
}
