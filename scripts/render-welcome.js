$ui.render({
  views: [
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
})