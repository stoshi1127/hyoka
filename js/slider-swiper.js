const swiper = new Swiper('.swiper-container', {
  // Optional parameters
  loop: false,
  // rewind: true,
  slidesPerView: 'auto',
  spaceBetween: '2.3%', //pc
  loopAdditionalSlides: 8,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    type: "progressbar",
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-slide-button-next',
    prevEl: '.swiper-slide-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    480: {
      spaceBetween: 33, //sp
    },
  },
});