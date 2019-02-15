$ui.render({
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
              views: [
                {
                  type: 'button',
                  props: {
                    icon: $icon("225", $color("white"), $size(20, 20)),
                    bgcolor: $color('black'),
                    radius: 12
                  },
                  layout(make) {
                    make.left.equalTo(15)
                    make.centerY.equalTo(super.view)
                    make.size.equalTo($size(24, 24))
                  },
                  events: {
                    tapped() {
                      $app.close()
                    }
                  }
                }
              ],
            }],
          }]
        },
        {
          type: "label",
          props: {
            text: "Welcome to JSBox Pinboard!",
            align: $align.center
          },
          layout: function(make, view) {
            make.center.equalTo(view.super)
          }
        },
      ]
    },
  ]
})