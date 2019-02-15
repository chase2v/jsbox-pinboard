const Pinboard = require('./pinboard')

function renderAllPinsPage(username, password) {
  Pinboard.getAllPins(username, password, (data) => {
    data = data.map(item => {
      return item.description
    })

    $ui.push({
      props: {
        id: "mainView",
        navBarHidden: true,
        statusBarStyle: 0,
      },
      
      views: [
        {
          type: "view",
          props: {
            id: "content",
            bgcolor: $color("clear"),
            clipsToBounds: true,
          },
          layout: function(make, view) {
            make.left.right.inset(0)
            make.bottom.inset(0)
            make.top.inset(0)
          },
          views: [
            {
              type: "view",
              props: {
                id: "localView",
              },
              layout: $layout.fill,
              views: [{
                type: "view",
                props: {
                  bgcolor: $color("clear"),
                },
                layout: function(make, view) {
                  make.left.top.right.inset(0)
                  if($device.info.version >= "11"){
                    make.bottom.equalTo(view.super.topMargin).offset(40)
                  } else {
                    make.height.equalTo(65)
                  }
                },
                views:[{
                  type: "view",
                  layout: function(make, view) {
                    make.left.bottom.right.inset(0)
                    make.height.equalTo(45)
                  },
                  views: [],
                }],
              }]
            },
            {
              type: "label",
              props: {
                id: "localListHeaderTitle",
                text: "本地",
                font: $font("Avenir-Black", 35),
                textColor: $color("black"),
                align: $align.center,
              },
              layout: function(make, view) {
                make.left.equalTo(15)
                make.top.equalTo(0)
                make.height.equalTo(45)
              }
            },
            {
              type: 'list',
              props: {
                data
              },
              layout: function(make, view) {
                make.top.equalTo(45)
                make.width.equalTo(view.super.width)
                make.height.equalTo(view.super.height)
              },
            }
          ]
        },
      ],
    })
  })
}

module.exports = renderAllPinsPage
