/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
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
/******/ })()
;
//# sourceMappingURL=script.js.map