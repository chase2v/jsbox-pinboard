const Pinboard = require('./pinboard')
const { getSharedInfo, isShare, isUrlValid } = require('./utils')

let url = ''
let title = ''
let description = ''
let tags = ''
let private = true
let readLater = false

function getFormView(urlFromSafari, titleFromSafari) {
  url = urlFromSafari
  title = titleFromSafari
  
  return [
    // url
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
        placeholder: 'Required, must starts with http/https',
        text: url,
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
          url = sender.text
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

    // title
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
      layout(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed(sender) {
          title = sender.text
        },
        returned(sender) {
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
        placeholder: 'Optional',
        text: description,
        bgcolor: $color('clear'),
        radius: 3,
        borderWidth: 1,
        borderColor: $color('#ccc'),
        type: $kbType.ascii,
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom).offset(10)
        make.width.equalTo(view.super)
        make.height.equalTo(120)
      },
      events: {
        changed(sender) {
          description = sender.text
        },
        returned(sender) {
          sender.blur()
        },
      },
    },

    // tags
    {
      type: 'label',
      props: {
        text: 'Tags:',
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
        placeholder: 'Optional',
        text: tags,
        bgcolor: $color('clear'),
        radius: 0
      },
      layout(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.width.equalTo(view.super)
        make.height.equalTo(40)
      },
      events: {
        changed(sender) {
          tags = sender.text
        },
        returned(sender) {
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
            text: 'Private',
            align: $align.center
          },
          layout(make, view) {
            make.left.equalTo(view.super)
          }
        },
        {
          type: 'switch',
          props: {
            on: private
          },
          layout(make, view) {
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
            text: 'Read later',
            align: $align.center
          },
          layout(make, view) {
            make.left.equalTo(view.super)
          }
        },
        {
          type: 'switch',
          props: {
            on: readLater
          },
          layout(make, view) {
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

function renderAddPin() {
  const shareInfo = getSharedInfo()
  url = shareInfo.url
  title = shareInfo.title
  if (isShare() && !isUrlValid(url)) {
    $ui.alert({
      title: 'Error',
      message: 'The url is not valid!',
    });
    return;
  } 
  
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
            type: 'list',
            layout(make, view) {
              make.left.right.bottom.inset(0)
              if($device.info.version >= '11'){
                make.top.equalTo(view.super.topMargin)
              } else {
                make.top.equalTo(65)
              }
            },
            props: {
              rowHeight: 525,
              separatorHidden: true,
              bgcolor: $color('clear'),
              header: {
                type: 'view',
                props: {
                  height: 45,
                },
                views: [
                  {
                    type: 'label',
                    props: {
                      id: 'localListHeaderTitle',
                      text: 'Add Bookmark',
                      font: $font('Avenir-Black', 35),
                      textColor: $color('black'),
                    },
                    layout(make, view) {
                      make.left.inset(15)
                      make.top.equalTo(0)
                      make.height.equalTo(45)
                    }
                  }
                ]
              },
              footer: {
                type: 'view',
                props: {
                  height: 90
                },
                views: [
                  {
                    type: 'button',
                    props: {
                      title: 'Save',
                      font: $font('bold', 20)
                    },
                    layout(make, view) {
                      make.left.right.inset(15)
                      make.height.equalTo(50)
                    },
                    events: {
                      tapped() {
                        Pinboard.addPin({
                          url,
                          description: title,
                          extended: description,
                          tags,
                          shared: private ? 'no' : 'yes',
                          toread: readLater ? 'yes' : 'no',
                        }, (res) => {
                          if (res.result_code === 'done') {
                            $ui.toast('Sucess!', 1.5)
                            if (isShare()) return $context.close()
                            return $ui.pop()
                          }
                          $ui.alert({
                            title: 'Error',
                            message: res.result_code,
                          })
                        })
                      }
                    }
                  },
                  {
                    type: 'button',
                    props: {
                      title: 'Cancel',
                      titleColor: $color('#bbb'),
                      bgcolor: $color('clear'),
                      font: $font(14)
                    },
                    layout(make, view) {
                      make.top.equalTo(view.prev.bottom).offset(10)
                      make.centerX.equalTo(view.super)
                      make.height.equalTo(40)
                      make.width.equalTo(100)
                    },
                    events: {
                      tapped() {
                        isShare() ? $context.close() : $ui.pop()
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
                      views: getFormView(url, title)
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
