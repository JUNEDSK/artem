const allImg = document.querySelectorAll(".section-scroll-gallery img");
const allCards = document.querySelectorAll(".desktop-content .scroll-card");

ScrollTrigger.create({
  trigger: ".section-scroll-content",
  start: "top 30%",
  end: "bottom bottom",
  pin: ".section-scroll-gallery",
  pinSpacing: false,
});

ScrollTrigger.create({
  trigger: ".overview",
  start: "top top",
  end: "bottom bottom",
  pin: ".overview-side",
  pinSpacing: false,
});
