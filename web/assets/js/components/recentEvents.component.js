/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************************!*\
  !*** ./templates/components/recentEvents/src/index.js ***!
  \********************************************************/
var recentEventsComponent = document.querySelector(".recentEventsComponent");
if (recentEventsComponent) {
  var swiper = new Swiper(recentEventsComponent, {
    slidesPerView: 1,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 10
      },
      992: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });
}
/******/ })()
;