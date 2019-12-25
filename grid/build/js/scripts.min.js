let slideIndex = 1;

showSlides(slideIndex);

function showSlides(n) {
  let i;
  var slides = document.getElementsByClassName("widget");
  var dots = document.getElementsByClassName("widgets__dot");

  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].className = slides[i].className.replace(" active", "");
			dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].className += " active";
  dots[slideIndex-1].className += " active";
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}
