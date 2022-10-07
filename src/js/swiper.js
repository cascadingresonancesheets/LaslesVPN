new Swiper(".testimonials__swiper", {
  spaceBetween: 50,

  breakpoints: {
    480: {
      width: 400,
    },
  },

  navigation: {
    nextEl: ".testimonials__next",
    prevEl: ".testimonials__prev",
  },

  pagination: {
    el: ".testimonials__pagination",
    clickable: true,
    bulletClass: "testimonials-bullet",
    bulletActiveClass: "testimonials-bullet-active",
  },
});
