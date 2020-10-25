$(document).ready(function () {
  var breakpointMobile = 767;
    var mainSlider = $(".slider__container");
    var defaultSlidersInterval = 5;
    var slidersInterval = +mainSlider.children().first().attr("data-interval") || defaultSlidersInterval;    

    if (!mainSlider.length) {
      return;
    }

    mainSlider.on("init", function(event, slick){
      $(".slider-dots")
      .find(".slider-dots__dot circle")
      .animate({
        transitionDuration: slidersInterval + "s",
      });
    });

    mainSlider.not(".slick-initialized").slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: slidersInterval * 1000,
      infinite: true,
      fade: true,
      dots: true,
      arrows: true,
      appendDots: $(".slider-dots"),
      nextArrow: '<button type="button" class="slider__next-btn"></button>',
      prevArrow: '<button type="button" class="slider__prev-btn"></button>',
      customPaging: function (slick, index) {
        return "<div class='slider-dots__dot'><span class='slider-dots__first-circle'></span><span class='slider-dots__second-circle'></span><svg class='slider-dots__third-circle' width='10px' height='10px' viewBox='0 0 10 10' version='1.1' xmlns='http://www.w3.org/2000/svg'><circle cx='5' cy='5' r='4'></circle></svg></div>";
      },
      responsive: [
        {
          breakpoint: breakpointMobile,
          settings: {
            arrows: false,
          },
        },
      ],
    });

    activateDotsAnimation(
      mainSlider,
      ".slider-dots",
      defaultSlidersInterval,
      true
    );

    function activateDotsAnimation(
      slider,
      dotsContainer,
      defaultSlidersInterval,
      changeArrows
    ) {
      $(dotsContainer).find("li").removeClass("active");
      $(dotsContainer).find("li").eq(0).addClass("active");
    
      slider.on("afterChange", function (event, slick, currentSlide, nextSlide) { 
        $(dotsContainer).removeClass("active");
        $(dotsContainer).find(".slick-active").eq(0).addClass("active");
      });
    
      slider.on("beforeChange", function (event, slick, currentSlide, nextSlide) {
        var nextPanel = slider.find("[data-slick-index=" + nextSlide + "]");
        var slideInterval = $(nextPanel).attr("data-interval") || defaultSlidersInterval;
    
        $(dotsContainer).find(".slick-active").eq(0).removeClass("active");    
        slider.slick("setOption", "autoplaySpeed", slideInterval*1000);
        $(dotsContainer)
        .find(".slider-dots__dot circle")
        .animate({
          transitionDuration: slideInterval + "s",
        });
        if ($(nextPanel).hasClass("light")) {
          $(dotsContainer).addClass("light");
          if (changeArrows) {
            slider.find(".slick-arrow").addClass("light");
          }
        } else {
          $(dotsContainer).removeClass("light");
          if (changeArrows) {
            slider.find(".slick-arrow").removeClass("light");
          }
        }
      });
    };
});