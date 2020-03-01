const scroll = document.querySelector(".slider-progress__line");
const panel = document.querySelector(".event-block-mobile-gallery__wrapper");

scroll.oninput = function() {
  const total = panel.scrollWidth - panel.offsetWidth;
  const percentage = total * (this.value / 100);
  panel.scrollLeft = percentage;
};

panel.onscroll = function() {
  const total = panel.scrollWidth - scroll.scrollWidth;
  scroll.value = (panel.scrollLeft / total) * 100;
};
