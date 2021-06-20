var fixedBox = {
  selector: "data-fixed-box",
  //fixedBoxPosition: 0,
  getElement: function (selector) {
    return $("[" + selector + "]");
  },
  // setFixedBoxPosition: function () {
  //   this.fixedBoxPosition = this.getElement(this.selector).offset().top;
  // },
  init: function () {
    var fixedBox = this.getElement(this.selector);
    if (!fixedBox.length) {
      return;
    }
    var fixedBoxId = fixedBox.data(this.selector.slice(5));
    var container = $("#" + fixedBoxId);
    var containerPosition = container.offset().top;
    var containerHeight = container.innerHeight();
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    if (
      windowScroll + windowHeight < containerPosition ||
      windowScroll > containerPosition + containerHeight
    ) {
      this.show();
    } else {
      this.hide();
    }
    // if (windowScroll + windowHeight < this.fixedBoxPosition) {
    //   !fixedBox.hasClass("fixed") && fixedBox.addClass("fixed");
    // } else {
    //   fixedBox.hasClass("fixed") && fixedBox.removeClass("fixed");
    // }
  },
  show: function () {
    var fixedBox = this.getElement(this.selector);
    //fixedBox.addClass("show");
    fixedBox.show();
  },
  hide: function () {
    var fixedBox = this.getElement(this.selector);
    //fixedBox.removeClass("show");
    fixedBox.hide();
  },
};

$(window).on('load', () => {
  //fixedBox.setFixedBoxPosition();
  fixedBox.init();
});

// $(window).on("scroll", function () {
//   fixedBox.init();
// });

$(window).scroll($.debounce(50, function(e) {
  fixedBox.init();
}));
