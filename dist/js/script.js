/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
// Tabs
const navWrapper = document.querySelector('.tabheader__items');
const navTabs = navWrapper.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');
const hideNavigationItem = () => {
  navTabs.forEach(item => {
    if (item.classList.contains('tabheader__item_active')) {
      item.classList.remove('tabheader__item_active');
    }
  });
};
const hideTabsContent = () => {
  tabsContent.forEach(item => {
    if (item.classList.contains('tabcontent_active')) {
      item.classList.remove('tabcontent_active');
    }
  });
};
const hideTabsAndNavItems = () => {
  hideNavigationItem();
  hideTabsContent();
};
const showTabAndNavItem = function () {
  let index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  navTabs[index].classList.add('tabheader__item_active');
  tabsContent[index].classList.add('tabcontent_active');
};
const clickOnNavItem = event => {
  const target = event.target;
  if (!target || !target.matches('.tabheader__item')) return;
  navTabs.forEach((item, index) => {
    if (item === target) {
      hideTabsAndNavItems();
      showTabAndNavItem(index);
      return;
    }
  });
};
navWrapper.addEventListener('click', clickOnNavItem);

// Timer

const deadlineTimer = '2023-07-25';
setTimer('.promotion__timer', deadlineTimer);
function getRemainingTime(deadline) {
  const timer = {
    total: Date.parse(deadline) - Date.now(),
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };
  if (timer.total > 0) {
    timer.days = Math.floor(timer.total / (1000 * 60 * 60 * 24));
    timer.hours = Math.floor(timer.total / (1000 * 60 * 60) % 24);
    timer.minutes = Math.floor(timer.total / 1000 / 60 % 60);
    timer.seconds = Math.floor(timer.total / 1000 % 60);
  }
  return timer;
}
function setTimer(selectorTimer, deadline) {
  const timer = document.querySelector(selectorTimer),
    days = timer.querySelector('#days'),
    hours = timer.querySelector('#hours'),
    minutes = timer.querySelector('#minutes'),
    seconds = timer.querySelector('#seconds');
  updateTimer();
  const intervalTimer = setInterval(updateTimer, 1000);
  function updateTimer() {
    const time = getRemainingTime(deadline);
    days.textContent = addZeroForValue(time.days);
    hours.textContent = addZeroForValue(time.hours);
    minutes.textContent = addZeroForValue(time.minutes);
    seconds.textContent = addZeroForValue(time.seconds);
    if (time.total <= 0) {
      clearInterval(intervalTimer);
    }
  }
}
function addZeroForValue(value) {
  return value < 10 ? `0${value}` : value;
}
/******/ })()
;
//# sourceMappingURL=script.js.map