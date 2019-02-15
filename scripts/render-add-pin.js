const Pinboard = require('./pinboard')

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
      type: "label",
      props: {
        id: "localListHeaderTitle",
        text: "Add Pin",
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
      type: 'view',
      layout(make, view) {
        make.left.right.bottom.inset(15)
        make.top.equalTo(45)
      },
      views: [
        {
          type: "input",
          props: {
            type: $kbType.search,
            placeholder: 'url',
            text: url
          },
          layout: function(make, view) {
            make.top.equalTo(20)
            make.size.equalTo($size(200, 32))
          },
          events: {
            changed: function(sender) {
              url = sender.text
            }
          }
        },
        {
          type: "input",
          props: {
            type: $kbType.search,
            placeholder: 'title',
            text: title,
          },
          layout: function(make, view) {
            make.top.equalTo(62)
            make.size.equalTo($size(200, 32))
          },
          events: {
            changed: function(sender) {
              title = sender.text
            }
          }
        },
        {
          type: "input",
          props: {
            type: $kbType.search,
            darkKeyboard: true,
            placeholder: 'description',
          },
          layout: function(make, view) {
            make.top.equalTo(104)
            make.size.equalTo($size(200, 32))
          },
          events: {
            changed: function(sender) {
              description = sender.text
            }
          }
        },
        {
          type: "input",
          props: {
            type: $kbType.search,
            darkKeyboard: true,
            placeholder: 'tags',
          },
          layout: function(make, view) {
            make.top.equalTo(146)
            make.size.equalTo($size(200, 32))
          },
          events: {
            changed: function(sender) {
              tags = sender.text
            }
          }
        },
        {
          type: 'view',
          layout(make) {
            make.left.right.equalTo(0)
            make.top.equalTo(190)
            make.height.equalTo(50)
          },
          views: [
            {
              type: "label",
              props: {
                text: "private",
                align: $align.center
              },
              layout: function(make, view) {
                make.left.equalTo(view.super)
              }
            },
            {
              type: "switch",
              props: {
                on: private
              },
              layout: function(make, view) {
                make.right.equalTo(view.super)
              },
              events: {
                changed(sender) {
                  private = sender.value
                }
              }
            }
          ]
        },
        {
          type: 'view',
          layout(make) {
            make.left.right.equalTo(0)
            make.top.equalTo(240)
            make.height.equalTo(50)
          },
          views: [
            {
              type: "label",
              props: {
                text: "read later",
                align: $align.center
              },
              layout: function(make, view) {
                make.left.equalTo(view.super)
              }
            },
            {
              type: "switch",
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
        {
          "type" : "button",
          "props" : {
            "id" : "button[0]",
            "title" : "Add",
          },
          layout: function(make, view) {
            make.bottom.inset(30)
            make.width.equalTo(view.super)
            make.height.equalTo(50)
          },
          "events" : {
            "tapped" : function(sender) {
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
    }
  ]
}


function renderAddPin(username, password, url, title) {
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
              id: "navView",
            },
            layout: $layout.fill,
            views: [{
              type: "view",
              props: {
                bgcolor: $color("white"),
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
                    type: "button",
                    props: {
                      id: "deleteLocalButton",
                      title: "取消",
                      font: $font(17),
                      bgcolor: $color("clear"),
                      titleColor: $color('black'),
                      info: false,
                    },
                    layout: function(make, view) {
                      make.left.inset(10)
                      make.width.equalTo(50)
                      make.centerY.equalTo(view.super)
                      make.height.equalTo(35)
                    },
                  }
                ]
              }],
            }]
          },
          {
            type: 'view',
            layout(make, view) {
              make.left.right.bottom.equalTo(0)
              if($device.info.version >= "11"){
                make.top.equalTo(view.super.topMargin).offset(45)
              } else {
                make.top.equalTo(110)
              }
            },
            views: getFormView(username, password, url, title),
          }
        ]
      },
    ],
  })
}

module.exports = renderAddPin
