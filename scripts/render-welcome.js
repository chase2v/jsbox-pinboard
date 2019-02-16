const renderLogin = require('./render-login')
const renderAllPins = require('./render-all-pins')
const renderAddPin = require('./render-add-pin')
const token = $cache.get('token') || ''
const username = $cache.get('username') || ''

const cautionsView = {
  type: 'view',
  layout: $layout.fill,
  props: {
    id: 'cautionsView',
  },
  views: [
    {
      type: 'label',
      props: {
        text: 'Please set your API Token first...',
        font: $font(16),
        textColor: $color('red'),
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.super).offset(15)
        make.height.equalTo(30)
      }
    },
    {
      type: 'label',
      props: {
        text: 'Please set your API Token first...',
        font: $font(16),
        textColor: $color('red'),
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(30)
      }
    },
    {
      type: 'label',
      props: {
        text: 'Please set your API Token first...',
        font: $font(16),
        textColor: $color('red'),
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(30)
      }
    },
  ]
}

const actionsView = {
  type: 'view',
  layout: $layout.fill,
  props: {
    id: 'actionsView',
  },
  views: [
    {
      type: 'label',
      props: {
        text: 'Now, you can visit...',
        font: $font(16),
        textColor: $color('black'),
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.super).offset(15)
        make.height.equalTo(30)
      }
    },
    {
      type: 'button',
      props: {
        title: '-  Your all bookmarks',
        titleColor: $color('blue'),
        bgcolor: $color('clear')
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(50)
      },
      events: {
        tapped() {
          renderAllPins()
        }
      }
    },
    {
      type: 'label',
      props: {
        text: 'or...',
        font: $font(16),
        textColor: $color('black'),
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(30)
      }
    },
    {
      type: 'button',
      props: {
        title: '-  Add a bookmark',
        titleColor: $color('blue'),
        bgcolor: $color('clear')
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(50)
      },
      events: {
        tapped() {
          renderAddPin()
        }
      }
    },
    {
      type: 'button',
      props: {
        title: '-  Log out',
        titleColor: $color('blue'),
        bgcolor: $color('clear')
      },
      layout(make, view) {
        make.left.inset(15)
        make.top.equalTo(view.prev.bottom).offset(-15)
        make.height.equalTo(50)
      },
      events: {
        tapped() {
          $cache.clear()
          $app.notify({
            name: 'showCautions',
          });
        }
      }
    },
  ]
}

function getContentView() {
  return {
    props: {
      id: 'contentView',
    },
    layout(make, view) {
      make.left.right.inset(0)
      make.top.equalTo(view.prev.bottom)
      make.bottom.inset(0)
    },
    views: [token ? actionsView : cautionsView]
  }
}

$ui.render({
  props: {
    navBarHidden: true,
    statusBarStyle: 0,
  },
  views: [
    {
      type: 'view',
      props: {
        id: 'main',
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
          layout: $layout.fill,
          views: [
            {
              type: 'view',
              props: {
                bgcolor: $color('clear'),
              },
              layout(make, view) {
                make.left.top.right.inset(0)
                if($device.info.version >= '11'){
                  make.bottom.equalTo(view.super.topMargin).offset(40)
                } else {
                  make.height.equalTo(65)
                }
              },
              views:[
                {
                  type: 'view',
                  layout(make, view) {
                    make.left.bottom.right.inset(0)
                    make.height.equalTo(45)
                  },
                  views: [
                    {
                      type: 'button',
                      props: {
                        title: 'Exit',
                        titleColor: $color('blue'),
                        bgcolor: $color('clear'),
                      },
                      layout(make) {
                        make.left.inset(15)
                        make.centerY.equalTo(super.view)
                        make.height.equalTo(24)
                      },
                      events: {
                        tapped() {
                          $app.close()
                        }
                      }
                    },
                    {
                      type: 'button',
                      props: {
                        id: 'loginButton',
                        title: token ? username || 'incorrect token' : 'Set API Token',
                        titleColor: $color('blue'),
                        bgcolor: $color('clear'),
                      },
                      layout(make) {
                        make.right.inset(15)
                        make.centerY.equalTo(super.view)
                        make.height.equalTo(24)
                      },
                      events: {
                        tapped() {
                          renderLogin()
                        }
                      }
                    }
                  ],
                }
              ],
            }
          ]
        },
        {
          type: 'label',
          props: {
            text: 'Welcome to',
            font: $font(20),
            textColor: $color('black'),
          },
          layout(make, view) {
            make.left.inset(15)
            make.top.equalTo(view.super.topMargin).offset(60)
            make.height.equalTo(30)
          }
        },
        {
          type: 'label',
          props: {
            text: 'JSBox Pinboard',
            font: $font('Avenir-Black', 35),
            textColor: $color('black'),
          },
          layout(make, view) {
            make.left.inset(15)
            make.top.equalTo(view.prev.bottom).offset(5)
            make.height.equalTo(45)
          }
        },
        getContentView()
      ]
    },
  ]
})

function showCautions() {
  if ($('cautionsView')) return;
  
  $('actionsView').remove()
  $('loginButton').title = 'Set API Token'
  $('contentView').add(cautionsView)
}

function showActions() {
  if ($('actionsView')) return;
  
  $('cautionsView').remove()
  $('loginButton').title = $cache.get('username') || 'incorrect token'
  $('contentView').add(actionsView)
}

$app.listen({
  showActions,
  showCautions,
});
