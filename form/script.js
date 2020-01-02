(function() {
  let contactUs = $(".button__contact"),
    formWrapper = $(".form__wrapper"),
    overlay = $(".overlay"),
    contactForm = $("#contact-form"),
    requestThankYou = $("#requestThankYou"),
    documentHeight = $(document).height(),
    percent = 0.25;

  $(document).scroll(() => {
    if (window.pageYOffset >= documentHeight * percent) {
      contactUs.show();
    }
  });

  $(document).click(e => {
    let target = $(e.target);

    switch (true) {
      case target.hasClass("button__contact"):
        formWrapper.css("right", "0");
        contactUs.hide();
        overlay.show();
        break;

      case target.hasClass("form__close") ||
        target.hasClass("overlay") ||
        target.hasClass("form__wrapper") ||
        target.hasClass("close-button"):
        formWrapper.css("right", "-600px");
        requestThankYou.fadeOut();
        contactForm.fadeIn(500);
        contactUs.show();
        overlay.hide();
        break;

      case target.hasClass("form-submit") ||
        target.hasClass("overlay") ||
        target.hasClass("form__wrapper") ||
        target.hasClass("close-button"):
        contactForm.hide();
        requestThankYou.fadeIn();
        break;
    }
  });
})();
