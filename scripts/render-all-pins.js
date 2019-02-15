const Pinboard = require('./pinboard')

function renderAllPinsPage(username, password) {
  Pinboard.getAllPins(username, password, (data) => {
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
  })
}

module.exports = renderAllPinsPage
