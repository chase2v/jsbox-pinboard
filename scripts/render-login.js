const renderAddPin = require('./render-add-pin.js')

let token = $cache.get('token') || ''

function getFormView() {
  return [
    {
      type: 'label',
      props: {
        text: 'API Token',
        font: $font('bold', 20)
      },
      layout(make) {
        make.size.equalTo($size(100, 25))
      }
    },
    {
      type: 'input',
      props: {
        placeholder: 'username:xxxxxx',
        text: token,
        bgcolor: $color('clear'),
        radius: 0,
        font: $font(16)
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed(sender) {
          token = sender.text
        },
        returned(sender) {
          sender.blur()
        }
      },
      views: [
        {
          type: 'view',
          props: {
            bgcolor: $color('#ccc')
          },
          layout(make, view) {
            make.width.equalTo(view.super)
            make.height.equalTo(1)
            make.centerX.equalTo(view.super)
            make.bottom.equalTo(0)
          }
        }
      ]
    },
  ]
}

function renderPageLogin(isShare) {

  $ui.push({
    props: {
      navBarHidden: true,
      statusBarStyle: 0,
    },

    views: [
      {
        type: 'view',
        props: {
          bgcolor: $color('clear'),
          clipsToBounds: true,
        },
        layout(make, view) {
          make.left.right.inset(0)
          make.bottom.inset(0)
          make.top.inset(0)
        },
        views: [
          {
            type: 'view',
            layout(make, view) {
              make.left.right.bottom.inset(0)
              if($device.info.version >= '11'){
                make.top.equalTo(view.super.topMargin)
              } else {
                make.top.equalTo(65)
              }
            },
            views: [
              {
                type: 'label',
                props: {
                  text: 'Set API Token',
                  font: $font('Avenir-Black', 35),
                  textColor: $color('black'),
                },
                layout(make, view) {
                  make.left.inset(15)
                  make.top.equalTo(0)
                  make.height.equalTo(45)
                }
              },
              {
                type: 'views',
                layout(make, view) {
                  make.top.equalTo(75)
                  make.left.right.inset(15)
                  make.bottom.equalTo(view.views[view.views.lenght - 1])
                },
                views: getFormView()
              },
              {
                type: 'button',
                props: {
                  title: 'Save',
                  font: $font('bold', 20)
                },
                layout(make, view) {
                  make.left.right.inset(15)
                  make.bottom.inset(80)
                  make.height.equalTo(50)
                },
                events: {
                  tapped(sender) {
                    $cache.set('token', token)
                    $cache.set('username', token.split(':')[0] || '')

                    $app.notify({
                      name: 'showActions',
                    });
                    
                    if (isShare) {
                      renderAddPin();
                    } else {
                      $ui.pop()
                    }
                  }
                }
              },
              {
                type: 'view',
                layout(make, view) {
                  make.bottom.inset(30)
                  make.centerX.equalTo(view.super)
                  make.height.equalTo(40)
                  make.width.equalTo(view.super)
                },
                views: [
                  {
                    type: 'button',
                    props: {
                      title: 'Cancel',
                      titleColor: $color('#bbb'),
                      bgcolor: $color('clear'),
                      font: $font(14)
                    },
                    layout(make, view) {
                      make.right.equalTo(view.super.centerX)
                      make.height.equalTo(40)
                      make.width.equalTo(82)
                    },
                    events: {
                      tapped() {
                        $ui.pop()
                      }
                    },
                    views: [
                      {
                        type: 'view',
                        props: {
                          bgcolor: $color('#bbb')
                        },
                        layout(make, view) {
                          make.width.equalTo(1)
                          make.height.equalTo(14)
                          make.centerY.equalTo(view.super)
                          make.right.equalTo(0)
                        }
                      }
                    ]
                  },
                  {
                    type: 'button',
                    props: {
                      title: 'Get Token',
                      titleColor: $color('#bbb'),
                      bgcolor: $color('clear'),
                      font: $font(14)
                    },
                    layout(make, view) {
                      make.left.equalTo(view.super.centerX)
                      make.height.equalTo(40)
                      make.width.equalTo(100)
                    },
                    events: {
                      tapped() {
                        $safari.open({
                          url: 'https://m.pinboard.in/settings/password',
                        })
                      }
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
    ],
  })
}

module.exports = renderPageLogin