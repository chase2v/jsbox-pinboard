// $ui.render("main");
var app = require("./scripts/app");

var username = ''
var password = ''

$ui.render({
  props: {
    "id" : "main"
  },
  views: [
    {
      type: "input",
      props: {
        type: $kbType.search,
        darkKeyboard: true,
        placeholder: 'username',
      },
      layout: function(make, view) {
        make.top.equalTo(view.super)
        make.size.equalTo($size(200, 32))
      },
      events: {
        changed: function(sender) {
          username = sender.text
        }
      }
    },
    {
      type: "input",
      props: {
        type: $kbType.search,
        darkKeyboard: true,
        placeholder: 'password',
      },
      layout: function(make, view) {
        make.top.equalTo(36)
        make.size.equalTo($size(200, 32))
      },
      events: {
        changed: function(sender) {
          password = sender.text
        }
      }
    },
    {
      "type" : "button",
      "props" : {
        "id" : "button[0]",
        "title" : "Get All Pins",
        "frame" : {
          "y" : 100,
          "x" : 0,
          "width" : 200,
          "height" : 36
        }
      },
      "events" : {
        "tapped" : function(sender) {
          app.sayHello(username, password);
        }
      }
    }
  ]
})