var app = require("./scripts/app");

exports.tapped = function(sender) {
  app.sayHello();
}
