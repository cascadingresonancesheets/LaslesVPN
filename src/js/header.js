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
