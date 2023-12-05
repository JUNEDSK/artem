'use strict';

//////////////////////////////////////////////////////
// Mobile header open & close functionality
const headerMobile = document.querySelector('.header-mobile');
const mobileNavOpenBtn = document.querySelector('.mobile-nav-open-btn');
const mobileNavCloseBtn = document.querySelector('.mobile-nav-close-btn');

mobileNavOpenBtn.addEventListener('click', function () {
  headerMobile.classList.remove('close');
  headerMobile.classList.add('open');
});

mobileNavCloseBtn.addEventListener('click', function () {
  headerMobile.classList.add('close');
  headerMobile.classList.remove('open');
});

///////////////////////////////////////////////////////
// Overview list
const allOverviewList = document.querySelectorAll('.overview-list');

if (allOverviewList.length !== 0) {
  allOverviewList.forEach(list => {
    const items = list.querySelectorAll('.overview-list-item');
    if (items.length % 2 !== 0) return;

    items[items.length - 2].style.borderBottom = 'none';
  });
}

//////////////////////////////////////////////////////
// Home hero animation
const homeSlides = Array.from(document.querySelectorAll('.home-slide'));
const numSlides = homeSlides.length;

if (numSlides > 0) {
  const sectionHero = document.querySelector('.section-home-hero');
  const nextBtns = document.querySelectorAll('.slide-next');
  const prevBtns = document.querySelectorAll('.slide-prev');
  const activeSlideDoms = document.querySelectorAll('.active-slide');
  const numSlideDoms = document.querySelectorAll('.num-slides');

  // Set height for home hero section
  const homeSlidesHeightArr = homeSlides.map(
    slide => slide.getBoundingClientRect().height
  );

  const heroHeight = Math.max(...homeSlidesHeightArr);

  sectionHero.style.height = heroHeight + 'px';

  let activeIndex = 0;
  let activeSlide = homeSlides[activeIndex];

  const animateSlide = slide => {
    const imgBox = slide.querySelectorAll('.home-hero-img-box');
    const subTitle = slide.querySelector('.home-hero-title-box h5');
    const title = slide.querySelector('.home-hero-title-box h2');
    const description = slide.querySelector('.home-hero-cta-box p');
    const videoBtn = slide.querySelector('.video-btn');
    const contactBtn = slide.querySelector('.contact-btn');
    const salesBtn = slide.querySelector('.sales-btn');

    imgBox[0].classList.add('fadeInLeft');
    imgBox[1].classList.add('fadeInLeft');
    subTitle.classList.add('fadeInRight');
    title.classList.add('fadeInRight');
    description.classList.add('fadeInRight');
    videoBtn.classList.add('fadeInRight');
    contactBtn.classList.add('fadeInUp');
    salesBtn.classList.add('fadeInUp');
  };

  const removeAnimationClasses = () => {
    document.querySelector('.fadeInLeft').classList.remove('fadeInLeft');
    document.querySelector('.fadeInRight').classList.remove('fadeInRight');
    document.querySelector('.fadeInRight').classList.remove('fadeInRight');
    document.querySelector('.fadeInRight').classList.remove('fadeInRight');
    document.querySelector('.fadeInRight').classList.remove('fadeInRight');
    document.querySelector('.fadeInUp').classList.remove('fadeInUp');
    document.querySelector('.fadeInUp').classList.remove('fadeInUp');
  };

  // Updates dom numbers
  const updateSlideNum = (activeIndex, totalSlides) => {
    activeSlideDoms.forEach(
      el => (el.textContent = String(activeIndex + 1).padStart(2, '0'))
    );
    numSlideDoms.forEach(
      el => (el.textContent = String(totalSlides).padStart(2, '0'))
    );
  };

  // Hide all home slides and make first slide visible
  const slideVisible = slide => {
    homeSlides.forEach(slide => {
      slide.style.opacity = 0;
      slide.style.visibility = 'hidden';
    });

    setTimeout(() => {
      slide.style.opacity = '1';
      slide.style.visibility = 'visible';
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
    btn.addEventListener('click', function () {
      clearInterval(sliderAutoPlayClear);
      slideNext();
      sliderAutoPlayClear = sliderAutoPlay();
    })
  );
  prevBtns.forEach(btn =>
    btn.addEventListener('click', function () {
      clearInterval(sliderAutoPlayClear);
      slidePrev();
      sliderAutoPlayClear = sliderAutoPlay();
    })
  );

  updateSlideNum(activeIndex, numSlides);
}

//////////////////////////////////////////////////////
// Modal video play stop functionality
const videoModal = document.querySelector('#videoModal');

if (videoModal) {
  videoModal.addEventListener('show.bs.modal', function () {
    const video = videoModal.querySelector('video');
    video.play();
  });

  videoModal.addEventListener('hide.bs.modal', function () {
    const video = videoModal.querySelector('video');
    video.pause();
    video.currentTime = 0;
  });
}

//////////////////////////////////////////////////////
// Team swiper functionality
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  slidesPerView: 1.7,
  spaceBetween: 32,

  breakpoints: {
    576: {
      slidesPerView: 2,
      spaceBetween: 32,
    },

    768: {
      slidesPerView: 3,
      spaceBetween: 32,
    },

    992: {
      slidesPerView: 4,
      spaceBetween: 32,
    },

    1200: {
      slidesPerView: 5,
      spaceBetween: 32,
    },
  },
});

////////////////////////////////////////////////////////
// Pin sidebar functionality
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const innerPageMain = document.querySelector('.inner-page-main');

if (sidebarWrapper) {
  ScrollTrigger.create({
    trigger: innerPageMain,
    start: 'top',
    end: 'bottom bottom',
    pin: sidebarWrapper,
  });
}

//////////////////////////////////////////////////////////
// Journey section animation
let mm = gsap.matchMedia();

if (document.querySelector('.journey-img-wrapper')) {
  mm.add('(min-width: 992px)', () => {
    const photos = gsap.utils.toArray('.journey-img-wrapper:not(:first-child)');

    gsap.set(photos, { opacity: 0 });

    const animation = gsap.to(photos, {
      opacity: 1,
      duration: 0.3,
      stagger: 1,
    });

    ScrollTrigger.create({
      trigger: '.journey-cards',
      start: 'top 30%',
      end: 'bottom bottom',
      pin: '.journey-images',
      animation: animation,
      scrub: true,
      pinSpacing: false,
    });
  });
}

//////////////////////////////////////////////////////////
// E-HIS page bug fix
// Function to initialize 'pageReloaded' in localStorage
function initializePageReloaded() {
  // Check if localStorage key 'pageReloaded' exists
  if (localStorage.getItem('pageReloaded') === null) {
    // If it doesn't exist, set its value to false
    localStorage.setItem('pageReloaded', 'false');
  }
}

// Function to perform actions when the URL includes 'e-his'
function handleEHISURL() {
  // Get the current URL
  var currentURL = window.location.href;

  // Check if the URL includes 'e-his'
  if (currentURL.includes('e-his')) {
    // Check if localStorage key 'pageReloaded' is false
    if (localStorage.getItem('pageReloaded') !== 'true') {
      // Scroll the page to the top
      window.scrollTo(0, 0);

      // Set localStorage key 'pageReloaded' to true
      localStorage.setItem('pageReloaded', 'true');

      // Reload the current page
      location.reload();

      console.log(
        'The URL includes "e-his". Scrolling to the top, updating localStorage, and reloading the page...'
      );
      // You can replace the console.log statement with your specific code.
    } else {
      // Check if the URL contains a specific hash
      var hash = window.location.hash.substring(1); // Exclude the "#" symbol
      if (hash) {
        // Select the section with the ID matching the hash
        var section = document.getElementById(hash);
        if (section) {
          // Scroll to the section
          section.scrollIntoView({ behavior: 'smooth' });
          console.log('Scrolled to section with id: ' + hash);
        } else {
          console.log('No section found with id: ' + hash);
        }
      }
    }
  }
}

// Function to handle beforeunload event
function handleBeforeUnload() {
  // Set localStorage key 'pageReloaded' to false when the user leaves the page
  localStorage.setItem('pageReloaded', 'false');
}

// Use window.onload to ensure the DOM is fully loaded before executing the script
window.onload = function () {
  // Call the function to initialize 'pageReloaded' in localStorage
  initializePageReloaded();

  // Call the function to handle actions for 'e-his' URL
  handleEHISURL();

  // Attach the beforeunload event to handle leaving the page
  window.addEventListener('beforeunload', handleBeforeUnload);
};
