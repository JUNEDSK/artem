const allImg = document.querySelectorAll(".section-scroll-gallery img");
const allCards = document.querySelectorAll(".desktop-content .scroll-card");

if (allImg.length > 0) {
  ScrollTrigger.create({
    trigger: ".section-scroll-content",
    start: "top 30%",
    end: "bottom bottom",
    pin: ".section-scroll-gallery",
    pinSpacing: false,
  });
}

ScrollTrigger.create({
  trigger: ".overview",
  start: "top top",
  end: "bottom bottom",
  pin: ".aside",
  pinSpacing: false,
});

///////////////////////////////////////////////////////
// Overview list
const allOverviewList = document.querySelectorAll(".overview-list");

if (allOverviewList.length !== 0) {
  allOverviewList.forEach(list => {
    const items = list.querySelectorAll(".overview-list-item");
    if (items.length % 2 !== 0) return;

    items[items.length - 2].style.borderBottom = "none";
  });
}
