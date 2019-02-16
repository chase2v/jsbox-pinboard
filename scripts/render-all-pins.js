const Pinboard = require('./pinboard')

function getAllBookmarks() {
  $('spinner').loading = true
  const cache = $cache.get('allBookmarks') || []
  $('list').data = cache
  
  Pinboard.getAllPins({}, (data) => {
    data = data.map(item => {
      return {
        item: {
          info: item,
        },
        label: {
          text: item.description
        }
      }
    })

    $cache.set('allBookmarks', data)
    $('list').data = data

    $('spinner').loading = false
  })
}

function searchByTags(tag) {
  if (!tag) return getAllBookmarks()
  
  $('spinner').loading = true
  const cache = $cache.get(`search:${tag}`) || []
  $('list').data = cache
  
  Pinboard.getAllPins({
    tag
  }, (data) => {
    data = data.map(item => {
      return {
        item: {
          info: item,
        },
        label: {
          text: item.description
        }
      }
    })

    $cache.set(`search:${tag}`, data)
    $('list').data = data

    $('spinner').loading = false
  }) 
}

const template = {
  props: {
    bgcolor: $('black')
  },
  views: [
    {
      type: 'view',
      props: {
        id: 'item',
        bgcolor: $('black')
      },
      layout: $layout.fill,
      events: {
        tapped(sender) {
          $safari.open({
            url: sender.info.href,
          });
        }
      },
      views: [
        {
          type: 'label',
          props: {
            id: 'label'
          },
          layout(make, view) {
            make.left.right.inset(15)
            make.height.equalTo(view.super)
          }
        }
      ]
    }
  ]
}

function renderAllPinsPage() {
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
                          title: 'Return',
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
                            $ui.pop()
                          }
                        }
                      },
                    ],
                  }
                ],
              }
            ]
          },
          {
            type: 'label',
            props: {
              text: 'All Bookmarks',
              font: $font('Avenir-Black', 35),
              textColor: $color('black'),
              align: $align.center,
            },
            layout(make, view) {
              make.left.equalTo(15)
              make.top.equalTo(view.super.topMargin).offset(45)
              make.height.equalTo(45)
            },
          },
          {
            type: 'spinner',
            props: {
              id: 'spinner',
              loading: true
            },
            layout: function(make, view) {
              make.left.equalTo(view.prev.right).offset(10)
              make.top.equalTo(view.super.topMargin).offset(45)
              make.height.equalTo(45)
            }
          },
          {
            type: 'input',
            props: {
              id: 'filter',
              placeholder: 'tags'
            },
            layout(make, view) {
              make.top.equalTo(view.prev.bottom).offset(15)
              make.left.inset(15)
              make.right.inset(80)
              make.height.equalTo(40)
            }
          },
          {
            type: 'button',
            props: {
              title: 'search',
              titleColor: $color('blue'),
              bgcolor: $color('clear')
            },
            layout(make, view) {
              make.top.equalTo(view.prev)
              make.right.inset(15)
              make.size.equalTo($size(50, 40))
            },
            events: {
              tapped() {
                searchByTags($('filter').text)
              }
            }
          },
          {
            type: 'list',
            props: {
              id: 'list',
              template
            },
            layout(make, view) {
              make.top.equalTo(view.prev.bottom).offset(15)
              make.width.equalTo(view.super.width)
              make.bottom.inset(0)
            },
          }
        ]
      },
    ],
  })

  getAllBookmarks()
}

module.exports = renderAllPinsPage
