function getAllPins({ tag = '' }, cb) {
  const token = $cache.get('token') || ''
  $http.get({
    url: `https://api.pinboard.in/v1/posts/all?auth_token=${token}&format=json&tag=${tag}`,
    handler(res) {
      if (Array.isArray(res.data)) {
        const data = res.data
        cb && cb(data)
      } else {
        $ui.alert({
          title: 'Error',
          message: res.data || res.response.statusCode,
        });
      }
    }
  })
}

function addPin(data, cb) {
  const token = $cache.get('token') || ''
  data = Object.keys(data).map(key => {
    if (!data[key]) return ''

    return `&${key}=${$text.URLEncode(data[key])}`
  }).join('')
  
  const url = `https://api.pinboard.in/v1/posts/add?auth_token=${token}&format=json${data}`
  
  $http.get({
    url,
    handler(res) {
      const data = res.data
      cb && cb(data)
    }
  })
}

module.exports = {
  getAllPins,
  addPin,
}
