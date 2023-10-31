"use strict";

//////////////////////////////////////////////////////
// Mobile header open & close functionality
const headerMobile = document.querySelector(".header-mobile");
const mobileNavOpenBtn = document.querySelector(".mobile-nav-open-btn");
const mobileNavCloseBtn = document.querySelector(".mobile-nav-close-btn");

mobileNavOpenBtn.addEventListener("click", function () {
  headerMobile.classList.remove("close");
  headerMobile.classList.add("open");
});

mobileNavCloseBtn.addEventListener("click", function () {
  headerMobile.classList.add("close");
  headerMobile.classList.remove("open");
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

//////////////////////////////////////////////////////
// Home hero animation
const homeSlides = Array.from(document.querySelectorAll(".home-slide"));
const numSlides = homeSlides.length;

if (numSlides > 0) {
  const sectionHero = document.querySelector(".section-home-hero");
  const nextBtns = document.querySelectorAll(".slide-next");
  const prevBtns = document.querySelectorAll(".slide-prev");
  const activeSlideDoms = document.querySelectorAll(".active-slide");
  const numSlideDoms = document.querySelectorAll(".num-slides");

  // Set height for home hero section
  const homeSlidesHeightArr = homeSlides.map(
    slide => slide.getBoundingClientRect().height
  );

  const heroHeight = Math.max(...homeSlidesHeightArr);

  sectionHero.style.height = heroHeight + "px";

  let activeIndex = 0;
  let activeSlide = homeSlides[activeIndex];

  const animateSlide = slide => {
    const imgBox = slide.querySelectorAll(".home-hero-img-box");
    const subTitle = slide.querySelector(".home-hero-title-box h5");
    const title = slide.querySelector(".home-hero-title-box h2");
    const description = slide.querySelector(".home-hero-cta-box p");
    const videoBtn = slide.querySelector(".video-btn");
    const contactBtn = slide.querySelector(".contact-btn");
    const salesBtn = slide.querySelector(".sales-btn");

    imgBox[0].classList.add("fadeInLeft");
    imgBox[1].classList.add("fadeInLeft");
    subTitle.classList.add("fadeInRight");
    title.classList.add("fadeInRight");
    description.classList.add("fadeInRight");
    videoBtn.classList.add("fadeInRight");
    contactBtn.classList.add("fadeInUp");
    salesBtn.classList.add("fadeInUp");
  };

  const removeAnimationClasses = () => {
    document.querySelector(".fadeInLeft").classList.remove("fadeInLeft");
    document.querySelector(".fadeInRight").classList.remove("fadeInRight");
    document.querySelector(".fadeInRight").classList.remove("fadeInRight");
    document.querySelector(".fadeInRight").classList.remove("fadeInRight");
    document.querySelector(".fadeInRight").classList.remove("fadeInRight");
    document.querySelector(".fadeInUp").classList.remove("fadeInUp");
    document.querySelector(".fadeInUp").classList.remove("fadeInUp");
  };

  // Updates dom numbers
  const updateSlideNum = (activeIndex, totalSlides) => {
    activeSlideDoms.forEach(
      el => (el.textContent = String(activeIndex + 1).padStart(2, "0"))
    );
    numSlideDoms.forEach(
      el => (el.textContent = String(totalSlides).padStart(2, "0"))
    );
  };

  // Hide all home slides and make first slide visible
  const slideVisible = slide => {
    homeSlides.forEach(slide => {
      slide.style.opacity = 0;
      slide.style.visibility = "hidden";
    });

    setTimeout(() => {
      slide.style.opacity = "1";
      slide.style.visibility = "visible";
      animateSlide(activeSlide);
    }, 1000);
  };

  slideVisible(activeSlide);

  const slideNext = () => {
    removeAnimationClasses();

    if (activeIndex === numSlides - 1) {
      activeIndex = 0;
    } else {
      activeIndex++;
    }

    updateSlideNum(activeIndex, numSlides);

    activeSlide = homeSlides[activeIndex];

    slideVisible(activeSlide);
  };

  const slidePrev = () => {
    removeAnimationClasses();
    if (activeIndex === 0) {
      activeIndex = numSlides - 1;
    } else {
      activeIndex--;
    }

    updateSlideNum(activeIndex, numSlides);

    activeSlide = homeSlides[activeIndex];

    slideVisible(activeSlide);
  };

  const sliderAutoPlay = () => {
    return setInterval(slideNext, 10000);
  };

  let sliderAutoPlayClear = sliderAutoPlay();

  nextBtns.forEach(btn =>
    btn.addEventListener("click", function () {
      clearInterval(sliderAutoPlayClear);
      slideNext();
      sliderAutoPlayClear = sliderAutoPlay();
    })
  );
  prevBtns.forEach(btn =>
    btn.addEventListener("click", function () {
      clearInterval(sliderAutoPlayClear);
      slidePrev();
      sliderAutoPlayClear = sliderAutoPlay();
    })
  );

  updateSlideNum(activeIndex, numSlides);
}

//////////////////////////////////////////////////////
// Modal video play stop functionality
const videoModal = document.querySelector("#videoModal");

if (videoModal) {
  videoModal.addEventListener("show.bs.modal", function () {
    const video = videoModal.querySelector("video");
    video.play();
  });

  videoModal.addEventListener("hide.bs.modal", function () {
    const video = videoModal.querySelector("video");
    video.pause();
    video.currentTime = 0;
  });
}

//////////////////////////////////////////////////////
// Team swiper functionality
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  slidesPerView: 1,
  spaceBetween: 32,

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 32,
    },

    992: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 32,
    },
  },
});

////////////////////////////////////////////////////////
// Pin sidebar functionality
const sidebarWrapper = document.querySelector(".sidebar-wrapper");
const innerPageMain = document.querySelector(".inner-page-main");

if (sidebarWrapper) {
  ScrollTrigger.create({
    trigger: innerPageMain,
    start: "top 20px",
    end: "bottom bottom",
    pin: sidebarWrapper,
  });
}
