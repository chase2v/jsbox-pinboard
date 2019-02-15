const Pinboard = require('./pinboard')
const { getSharedInfo, isShare, isUrlValid } = require('./utils')

let url = ''
let title = ''
let description = ''
let tags = ''
let private = true
let readLater = false

function getFormView(username, password, urlFromSafari, titleFromSafari) {
  url = urlFromSafari
  title = titleFromSafari
  
  return [
    {
      type: 'label',
      props: {
        text: 'Url:',
        font: $font(20)
      },
      layout(make) {
        make.size.equalTo($size(50, 25))
      }
    },
    {
      type: 'input',
      props: {
        placeholder: 'Required',
        text: url,
        bgcolor: $color('clear'),
        radius: 0,
        font: $font(16)
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed: function(sender) {
          url = sender.text
        },
        returned: function(sender) {
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
    {
      type: 'label',
      props: {
        text: 'Title:',
        font: $font(20)
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom).offset(15)
        make.size.equalTo($size(50, 25))
      }
    },
    {
      type: 'input',
      props: {
        placeholder: 'Required',
        text: title,
        bgcolor: $color('clear'),
        radius: 0
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed: function(sender) {
          title = sender.text
        },
        returned: function(sender) {
          sender.blur()
        },
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

    // Description
    {
      type: 'label',
      props: {
        text: 'Description:',
        font: $font(20)
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom).offset(15)
        make.size.equalTo($size(200, 25))
      }
    },
    {
      type: 'text',
      props: {
        id: 'descriptionText',
        placeholder: 'Required',
        text: description,
        bgcolor: $color('clear'),
        radius: 3,
        borderWidth: 1,
        borderColor: $color('#ccc'),
        type: $kbType.ascii,
        accessoryView: {
          type: "view",
          props: {
            height: 44
          },
          views: [
            {
              type: 'button',
              props: {
                title: '收起',
                titleColor: $color('black'),
                bgcolor: $color('clear')
              },
              layout(make) {
                make.right.equalTo(0)
                make.size.equalTo($size(50, 44))
              },
              events: {
                tapped(sender) {
                  $('descriptionText').blur()
                }
              }
            }
          ]
        }
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(10)
        make.width.equalTo(view.super)
        make.height.equalTo(120)
      },
      events: {
        changed: function(sender) {
          description = sender.text
        },
        returned: function(sender) {
          sender.blur()
        },
      },
    },

    // tags
    {
      type: 'label',
      props: {
        text: 'tags:',
        font: $font(20)
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom).offset(15)
        make.size.equalTo($size(200, 25))
      }
    },
    {
      type: 'input',
      props: {
        placeholder: 'Required',
        text: tags,
        bgcolor: $color('clear'),
        radius: 0
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed: function(sender) {
          tags = sender.text
        },
        returned: function(sender) {
          sender.blur()
        },
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

    // private
    {
      type: 'view',
      layout(make, view) {
        make.left.right.equalTo(0)
        make.top.equalTo(view.prev.bottom).offset(15)
        make.height.equalTo(50)
      },
      views: [
        {
          type: 'label',
          props: {
            text: 'private',
            align: $align.center
          },
          layout: function(make, view) {
            make.left.equalTo(view.super)
          }
        },
        {
          type: 'switch',
          props: {
            on: private
          },
          layout: function(make, view) {
            make.right.inset(0)
          },
          events: {
            changed(sender) {
              private = sender.value
            }
          }
        }
      ]
    },

    // read later
    {
      type: 'view',
      layout(make, view) {
        make.left.right.equalTo(0)
        make.top.equalTo(view.prev.bottom)
        make.height.equalTo(50)
      },
      views: [
        {
          type: 'label',
          props: {
            text: 'read later',
            align: $align.center
          },
          layout: function(make, view) {
            make.left.equalTo(view.super)
          }
        },
        {
          type: 'switch',
          props: {
            on: readLater
          },
          layout: function(make, view) {
            make.right.equalTo(view.super)
          },
          events: {
            changed(sender) {
              readLater = sender.value
            }
          }
        }
      ]
    },
  ]
}

function renderAddPin(username, password) {
  const {
    url = '',
    title = '',
  } = getSharedInfo()
  if (isShare() && !isUrlValid(url)) {
    $ui.alert({
      title: 'Error',
      message: 'The url is not valid!',
    });
    return;
  } 
  
  $ui.push({
    props: {
      id: 'main',
      navBarHidden: true,
      statusBarStyle: 0,
    },

    views: [
      {
        type: 'view',
        props: {
          id: 'content',
          bgcolor: $color('clear'),
          clipsToBounds: true,
        },
        layout: function(make, view) {
          make.left.right.inset(0)
          make.bottom.inset(0)
          make.top.inset(0)
        },
        views: [
          {
            type: 'view',
            props: {
              id: 'navView',
            },
            layout: $layout.fill,
            views: [
              {
                type: 'view',
                props: {
                  bgcolor: $color('white'),
                },
                layout: function(make, view) {
                  make.left.top.right.inset(0)
                  if($device.info.version >= '11'){
                    make.bottom.equalTo(view.super.topMargin).offset(40)
                  } else {
                    make.height.equalTo(65)
                  }
                },
                // views:[
                //   {
                //     type: 'view',
                //     layout: function(make, view) {
                //       make.left.bottom.right.inset(0)
                //       make.height.equalTo(45)
                //     },
                //     views: [
                //       {
                //         type: 'button',
                //         props: {
                //           id: 'deleteLocalButton',
                //           title: '取消',
                //           font: $font(17),
                //           bgcolor: $color('clear'),
                //           titleColor: $color('black'),
                //           info: false,
                //         },
                //         layout: function(make, view) {
                //           make.left.inset(10)
                //           make.width.equalTo(50)
                //           make.centerY.equalTo(view.super)
                //           make.height.equalTo(35)
                //         },
                //       }
                //     ]
                //   }
                // ],
              }
            ]
          },
          {
            type: 'list',
            layout(make, view) {
              make.left.right.bottom.inset(0)
              if($device.info.version >= '11'){
                make.top.equalTo(view.super.topMargin)
                // make.top.equalTo(view.super.topMargin).offset(45)
              } else {
                make.top.equalTo(65)
              }
            },
            props: {
              rowHeight: 554,
              separatorHidden: true,
              bgcolor: $color('clear'),
              header: {
                views: [
                  {
                    type: 'label',
                    props: {
                      height: 45,
                      id: 'localListHeaderTitle',
                      text: 'Add Bookmark',
                      font: $font('Avenir-Black', 35),
                      textColor: $color('black'),
                    },
                    layout: function(make, view) {
                      make.left.inset(15)
                      make.top.equalTo(0)
                      make.height.equalTo(45)
                    }
                  }
                ]
              },
              footer: {
                views: [
                  {
                    'type' : 'button',
                    'props' : {
                      'title' : 'Add',
                    },
                    layout: function(make, view) {
                      make.left.right.inset(15)
                      make.bottom.inset(30)
                      make.height.equalTo(50)
                    },
                    'events' : {
                      'tapped' : function(sender) {
                        Pinboard.addPin(username, password, {
                          url,
                          description: title,
                          extended: description,
                          tags,
                          shared: private ? 'no' : 'yes',
                          toread: readLater ? 'yes' : 'no',
                        }, (res) => {
                          if (res.result_code === 'done') $context.close()
                          $ui.alert({
                            title: 'Error',
                            message: res.result_code,
                          })
                        })
                      }
                    }
                  }
                ]
              },
              data: [
                {
                  rows: [
                    {
                      type: 'views',
                      props: {
                      },
                      layout(make, view) {
                        make.top.equalTo(15)
                        make.left.right.inset(15)
                        make.bottom.equalTo(view.views[view.views.lenght - 1])
                      },
                      views: getFormView(username, password, url, title)
                    }
                  ]
                },
              ]
            },
          }
        ]
      },
    ],
  })
}

module.exports = renderAddPin
