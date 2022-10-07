window.addEventListener("DOMContentLoaded", () => {
  // Counter
  const userValue = document.querySelector("#userValue");
  const locationsValue = document.querySelector("#locationsValue");
  const serversValue = document.querySelector("#serversValue");
  animateCounter(userValue, 10, 1400);
  animateCounter(locationsValue, 1, 1400);
  animateCounter(serversValue, 5, 1400);

  // Plan Items FadeIn
  const planItems = document.querySelectorAll(".plan-item");
  document.addEventListener("scroll", () => {
    const clientHeight = document.documentElement.clientHeight;

    planItems.forEach((planItem) => {
      const elemY = planItem.getBoundingClientRect().y;
      const elemHeight = planItem.clientHeight;

      if (clientHeight > elemY + elemHeight / 3) {
        planItem.style.animation = "fadeIn 0.3s forwards ease-in";
      }
    });
  });
});

function animateCounter(counterElement, startInt, speed) {
  const initialWidht = counterElement.clientWidth;
  counterElement.style.width = initialWidht + "px";
  let i = startInt;
  let v = parseInt(counterElement.innerHTML);

  const counterElementIntervalId = setInterval(() => {
    counterElement.innerHTML = i++;
    if (i === v) {
      counterElement.innerHTML = v;
      clearInterval(counterElementIntervalId);
    }
  }, speed / (v - i));
}

window.addEventListener("DOMContentLoaded", () => {
  const body = document.querySelector("body");
  const humbBtn = document.querySelector(".burger-btn");
  const headerNav = document.querySelector(".header-nav");
  const headerBtns = document.querySelector(".header-btns");
  const backDrop = document.querySelector(".backdrop");

  humbBtn.addEventListener("click", function () {
    headerNav.classList.toggle("header-nav_active");
    headerBtns.classList.toggle("header-btns_active");
    backDrop.classList.toggle("backdrop_active");
    body.classList.toggle("no-scroll");
  });

  window.addEventListener("resize", function () {
    headerNav.classList.remove("header-nav_active");
    headerBtns.classList.remove("header-btns_active");
    backDrop.classList.remove("backdrop_active");
    body.classList.remove("no-scroll");
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".header") && !e.target.closest(".burger-btn")) {
      headerNav.classList.remove("header-nav_active");
      headerBtns.classList.remove("header-btns_active");
      backDrop.classList.remove("backdrop_active");
      body.classList.remove("no-scroll");
    }
  });
});

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

//# sourceMappingURL=main.js.map
