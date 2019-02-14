function sayHello(username, password) {
  // $ui.alert($l10n('HELLO_WORLD'));
  console.log(username, password)
  $http.get({
    url: 'https://' + username + ':' + password + '@api.pinboard.in/v1/posts/all?format=json',
    handler: function(resp) {
      var data = resp.data
      console.log(data)

      data = data.map(item => {
        return item.description
      })

      $ui.push({
        views: [
          {
            type: 'list',
            props: {
              data
            },
            layout: function(make, view) {
              make.width.equalTo(view.super.width)
              make.height.equalTo(view.super.height)
            },
          }
        ],
      })
    }
  })
}

module.exports = {
  sayHello: sayHello
}