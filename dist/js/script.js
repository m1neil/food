/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calculator.js":
/*!**************************************!*\
  !*** ./src/js/modules/calculator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const calculatorInit = () => {
  let gender, height, weight, age, activity;
  if (localStorage.getItem('gender')) {
    gender = localStorage.getItem('gender');
  } else {
    localStorage.setItem('gender', 'female');
    gender = localStorage.getItem('gender');
  }
  if (localStorage.getItem('activity')) {
    activity = localStorage.getItem('activity');
  } else {
    localStorage.setItem('activity', '1.375');
    activity = localStorage.getItem('activity');
  }
  clearActive('calculating__choose-item_active', 'data-gender', gender);
  clearActive('calculating__choose-item_active', 'data-activity', activity);
  function clearActive(activeClass, dataAttribute, value) {
    const arr = document.querySelectorAll(`[${dataAttribute}]`);
    console.log(arr);
    if (arr.length) {
      arr.forEach(item => {
        item.classList.remove(activeClass);
        if (item.getAttribute(dataAttribute) === value) {
          item.classList.add(activeClass);
        }
      });
    }
  }
  const result = document.querySelector('.calculating__result span');
  const dataWrappers = document.querySelectorAll('[data-info]');
  calculateResult();
  function calculateResult() {
    if (!gender || !height || !weight || !age || !activity || !result) {
      result.textContent = '____';
      return;
    }
    let totalResult = 0;
    if (gender === 'male') {
      totalResult = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity;
    } else if (gender === 'female') {
      totalResult = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity;
    }
    result.textContent = totalResult.toFixed(2);
  }
  if (dataWrappers.length) {
    dataWrappers.forEach(item => {
      const btns = item.querySelectorAll('div');
      item.addEventListener('click', event => {
        const target = event.target;
        if (!target.hasAttribute('data-gender') && !target.hasAttribute('data-activity')) return;
        if (target.hasAttribute('data-gender')) {
          gender = target.getAttribute('data-gender');
          localStorage.setItem('gender', gender);
        } else if (target.hasAttribute('data-activity')) {
          activity = +target.getAttribute('data-activity');
          localStorage.setItem('activity', activity);
        }
        if (btns.length) {
          btns.forEach(btn => btn.classList.remove('calculating__choose-item_active'));
        }
        target.classList.add('calculating__choose-item_active');
        console.log(gender);
        console.log(activity);
        calculateResult();
      });
    });
  }
  const inputs = document.querySelectorAll('.calculating input');
  if (inputs.length) {
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.value.match(/[a-z]/gi)) {
          input.classList.add('error');
          return;
        }
        input.classList.remove('error');
        switch (input.getAttribute('id')) {
          case 'height':
            height = +input.value;
            break;
          case 'weight':
            weight = +input.value;
            break;
          case 'age':
            age = +input.value;
            break;
          default:
            console.log('not found so attribute');
            break;
        }
        calculateResult();
      });
    });
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculatorInit);

/***/ }),

/***/ "./src/js/modules/form.js":
/*!********************************!*\
  !*** ./src/js/modules/form.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   formController: () => (/* binding */ formController)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./services */ "./src/js/modules/services.js");


const statusLoad = {
  loading: 'icons/spinner.svg',
  success: 'Спасибо за заказ',
  error: 'Что-то пошло не по плану'
};
function formController(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const message = document.createElement('div');
    message.classList.add('modal__loading');
    message.innerHTML = `<img src=${statusLoad.loading} alt="loading">`;
    form.after(message);
    const formData = new FormData(form);
    const parseForJson = JSON.stringify(Object.fromEntries(formData.entries()));
    (0,_services__WEBPACK_IMPORTED_MODULE_1__.sendData)('http://localhost:3000/requests', parseForJson).then(() => {
      sayThanks(statusLoad.success);
    }).catch(error => {
      console.log(error);
      sayThanks(statusLoad.error);
    }).finally(() => {
      message.remove();
      form.reset();
    });
  });
}
function sayThanks(message) {
  const activeModal = document.querySelector('.modal.open');
  const modalThanks = document.querySelector('#modal-thanks');
  const modalThanksTitle = modalThanks.querySelector('.modal__title');
  if (modalThanksTitle) {
    modalThanksTitle.textContent = message;
  }
  if (activeModal) {
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.deleteActiveClassOpenModal)(activeModal);
    setTimeout(() => {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalThanks);
    }, _services__WEBPACK_IMPORTED_MODULE_1__.bodyController.timeBlock);
  } else {
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(modalThanks);
  }
}


/***/ }),

/***/ "./src/js/modules/menuCard.js":
/*!************************************!*\
  !*** ./src/js/modules/menuCard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MenuCard: () => (/* binding */ MenuCard)
/* harmony export */ });
class MenuCard {
  constructor() {
    let src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'src';
    let alt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'alt';
    let title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'title';
    let text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'text';
    let price = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 435;
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.text = text;
    this.price = this.convertToUAH(price).toFixed(2);
    for (var _len = arguments.length, classes = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      classes[_key - 5] = arguments[_key];
    }
    classes.length > 0 ? this.classes = classes : this.classes = ['menu__item'];
  }
  createElement(container) {
    const card = document.createElement('div');
    card.classList.add(...this.classes);
    card.innerHTML = `
			<img src=${this.src} alt=${this.alt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.text}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		`;
    if (document.querySelector(container)) {
      document.querySelector(container).append(card);
    }
  }
  convertToUAH(value) {
    return value * 36.6;
  }
}


/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   deleteActiveClassOpenModal: () => (/* binding */ deleteActiveClassOpenModal),
/* harmony export */   openModal: () => (/* binding */ openModal)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/js/modules/services.js");

function openModal(modal) {
  if (!_services__WEBPACK_IMPORTED_MODULE_0__.bodyController.unLockModal) return;
  modal.classList.add('open');
  _services__WEBPACK_IMPORTED_MODULE_0__.bodyController.blockBody();
  modal.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModal);
}
function closeModal(event) {
  const target = event.target;
  const modal = document.querySelector('.modal.open');
  if (!_services__WEBPACK_IMPORTED_MODULE_0__.bodyController.unLockModal) return;
  if (event.code === 'Escape' || target === modal || target.hasAttribute('data-close-modal')) {
    deleteActiveClassOpenModal(modal);
  }
}
function deleteActiveClassOpenModal(modal) {
  modal.classList.remove('open');
  _services__WEBPACK_IMPORTED_MODULE_0__.bodyController.unBlockBody();
  modal.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModal);
}


/***/ }),

/***/ "./src/js/modules/services.js":
/*!************************************!*\
  !*** ./src/js/modules/services.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bodyController: () => (/* binding */ bodyController),
/* harmony export */   getData: () => (/* binding */ getData),
/* harmony export */   sendData: () => (/* binding */ sendData)
/* harmony export */ });
const getData = async url => {
  const request = await fetch(url);
  if (!request.ok) {
    throw new Error(`not fetch data to url ${url}, status = ${request.status}`);
  }
  return await request.json();
};
const sendData = async (url, data) => {
  const request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  if (!request.ok) {
    throw new Error(`Error send data url: ${request.url} status: ${request.status}`);
  }
};
const bodyController = {
  widthScroll: window.innerWidth - document.documentElement.clientWidth,
  unLockModal: true,
  timeBlock: 600,
  blockBody() {
    document.body.classList.add('lock');
    document.body.style.paddingRight = `${this.widthScroll}px`;
    this.unLockModal = false;
    setTimeout(() => {
      this.unLockModal = true;
    }, this.timeBlock);
  },
  unBlockBody() {
    this.unLockModal = false;
    setTimeout(() => {
      this.unLockModal = true;
      document.body.classList.remove('lock');
      document.body.style.paddingRight = '';
    }, this.timeBlock);
  }
};


/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer */ "./src/js/modules/timer.js");

const slider = _ref => {
  let {
    sliderSelector,
    fieldSliderSelector,
    slidesSelector,
    btnPrevSelector,
    btnNextSelector,
    currentSlideSelector,
    totalSlideSelector,
    paginationSelector
  } = _ref;
  const slider = document.querySelector(sliderSelector);
  const fieldSlider = slider.querySelector(fieldSliderSelector);
  const slides = slider.querySelectorAll(slidesSelector);
  const btnPrev = slider.querySelector(btnPrevSelector);
  const btnNext = slider.querySelector(btnNextSelector);
  const currentSlide = document.querySelector(currentSlideSelector);
  const totalSlide = document.querySelector(totalSlideSelector);
  const pagination = document.querySelector(paginationSelector);
  currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(1);
  totalSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slides.length);
  let slideIndex = 1;
  const widthSlide = +window.getComputedStyle(slider).width.replace(/\D/gi, '');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.width = `${widthSlide}px`;
    const dotPagination = document.createElement('button');
    dotPagination.classList.add('offer__btn-pagination');
    if (i === 0) {
      dotPagination.classList.add('offer__btn-pagination_active');
    }
    pagination.append(dotPagination);
  }
  let scroolX = 0;
  fieldSlider.style.width = 100 * slides.length + '%';
  btnNext.addEventListener('click', () => sliderLif('next'));
  btnPrev.addEventListener('click', () => sliderLif('prev'));
  const paginationBtns = document.querySelectorAll('.offer__btn-pagination');
  paginationBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      slideIndex = index + 1;
      currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
      scroolX = widthSlide * index;
      fieldSlider.style.transform = `translateX(-${scroolX}px)`;
      activeCurrentPagination(index);
    });
  });
  function activeCurrentPagination(index) {
    paginationBtns.forEach(btn => btn.classList.remove('offer__btn-pagination_active'));
    paginationBtns[index].classList.add('offer__btn-pagination_active');
  }
  function sliderLif() {
    let direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'next';
    if (direction === 'next') {
      if (scroolX === widthSlide * (slides.length - 1)) {
        scroolX = 0;
        slideIndex = 1;
      } else {
        scroolX += widthSlide;
        slideIndex++;
      }
    } else if (direction === 'prev') {
      if (scroolX === 0) {
        scroolX = widthSlide * (slides.length - 1);
        slideIndex = slides.length;
      } else {
        scroolX -= widthSlide;
        slideIndex--;
      }
    }
    fieldSlider.style.transform = `translateX(-${scroolX}px)`;
    currentSlide.textContent = (0,_timer__WEBPACK_IMPORTED_MODULE_0__.addZero)(slideIndex);
    activeCurrentPagination(slideIndex - 1);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const tabs = () => {
  const tabWrapper = document.querySelector('.tabcontainer');
  const tabContents = tabWrapper.querySelectorAll('.tabcontent');
  const tabNavWrap = tabWrapper.querySelector('.tabheader__items');
  const tabNavItems = tabWrapper.querySelectorAll('.tabheader__item');
  hideAllTabContents();
  removeActiveClassTabNavItems();
  showCurrentTabContent();
  tabNavWrap.addEventListener('click', event => {
    const target = event.target;
    if (!target.classList.contains('tabheader__item')) return;
    tabNavItems.forEach((item, i) => {
      if (item === target) {
        if (tabContents.length < i + 1 || tabNavItems.length < i + 1) return;
        hideAllTabContents();
        removeActiveClassTabNavItems();
        showCurrentTabContent(i);
      }
    });
  });
  function hideAllTabContents() {
    tabContents.forEach(tab => tab.classList.remove('tabcontent_active'));
  }
  function removeActiveClassTabNavItems() {
    tabNavItems.forEach(item => item.classList.remove('tabheader__item_active'));
  }
  function showCurrentTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabContents[i].classList.add('tabcontent_active');
    tabNavItems[i].classList.add('tabheader__item_active');
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addZero: () => (/* binding */ addZero),
/* harmony export */   timer: () => (/* binding */ timer)
/* harmony export */ });
const timer = (selector, deadline) => {
  setTimer(selector, deadline);
  function getLastTime(deadline) {
    const t = Date.parse(deadline) - Date.parse(new Date());
    let days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0;
    if (t > 0) {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor(t / (1000 * 60 * 60) % 24);
      minutes = Math.floor(t / 1000 / 60 % 60);
      seconds = Math.floor(t / 1000 % 60);
    }
    return {
      total: t,
      days,
      hours,
      minutes,
      seconds
    };
  }
  function setTimer(selector, deadline) {
    const timer = document.querySelector(selector);
    if (!timer) return;
    const days = timer.querySelector('#days');
    const hours = timer.querySelector('#hours');
    const minutes = timer.querySelector('#minutes');
    const seconds = timer.querySelector('#seconds');
    updateTimer();
    const pushTime = setInterval(updateTimer, 1000);
    function updateTimer() {
      const time = getLastTime(deadline);
      if (time.total < deadline) {
        clearInterval(pushTime);
      } else {
        days.textContent = addZero(time.days);
        hours.textContent = addZero(time.hours);
        minutes.textContent = addZero(time.minutes);
        seconds.textContent = addZero(time.seconds);
      }
    }
  }
};
function addZero(value) {
  return value < 10 ? `0${value}` : value;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/services */ "./src/js/modules/services.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_menuCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/menuCard */ "./src/js/modules/menuCard.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/form */ "./src/js/modules/form.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calculator */ "./src/js/modules/calculator.js");










(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__.timer)('.promotion__timer', '2023/09/5');
const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');
btns.forEach(btn => {
  btn.addEventListener('click', () => {
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(modal);
  });
});
(0,_modules_services__WEBPACK_IMPORTED_MODULE_1__.getData)('http://localhost:3000/menu').then(data => {
  data.forEach(_ref => {
    let {
      img,
      altimg,
      title,
      descr,
      price
    } = _ref;
    new _modules_menuCard__WEBPACK_IMPORTED_MODULE_4__.MenuCard(img, altimg, title, descr, price, 'menu__item').createElement('.menu__field .container');
  });
});

// FORM ----------------------------------------------------------------------------------------------------
const forms = document.querySelectorAll('form');
forms.forEach(form => (0,_modules_form__WEBPACK_IMPORTED_MODULE_5__.formController)(form));

// slider  ----------------------------------------------------------------------------------------------------
(0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
  sliderSelector: '.offer__slider',
  fieldSliderSelector: '.offer__slides',
  slidesSelector: '.offer__slide',
  btnPrevSelector: '.offer__slider-prev',
  btnNextSelector: '.offer__slider-next',
  currentSlideSelector: '#current',
  totalSlideSelector: '#total',
  paginationSelector: '.offer__pagination'
});

// calculator ====================================================================================================================
(0,_modules_calculator__WEBPACK_IMPORTED_MODULE_7__["default"])();
})();

/******/ })()
;
//# sourceMappingURL=script.js.map