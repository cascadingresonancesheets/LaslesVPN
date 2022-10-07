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
