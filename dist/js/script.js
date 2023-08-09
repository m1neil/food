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
  const intervalTimer = setInterval(updateTimer, 1000);
  updateTimer();
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

// Modal

const bodyController = {
  widthScroll: `${window.innerWidth - document.body.clientWidth}px`,
  isInteraction: true,
  lockBody() {
    document.body.classList.add('lock');
    document.body.style.paddingRight = this.widthScroll;
    this.lockInteraction();
  },
  unLockBody() {
    this.lockInteraction();
    setTimeout(() => {
      document.body.classList.remove('lock');
      document.body.style.paddingRight = '0';
    }, 600);
  },
  lockInteraction() {
    this.isInteraction = false;
    setTimeout(() => {
      this.isInteraction = true;
    }, 600);
  }
};
const btnLinks = document.querySelectorAll('[data-modal]');
if (btnLinks.length) {
  btnLinks.forEach(btn => {
    btn.addEventListener('click', openModal);
  });
}
function openModal(event) {
  const target = event.target;
  if (target?.getAttribute('data-modal') && document.querySelector(target.getAttribute('data-modal')) && bodyController.isInteraction) {
    const modal = document.querySelector(target.getAttribute('data-modal'));
    modal.classList.add('open');
    bodyController.lockBody();
    modal.addEventListener('click', closeModal);
    window.addEventListener('keydown', closeModalOnButton);
  }
}
function closeModal(event) {
  const target = event.target;
  if (!bodyController.isInteraction) return;
  if (target && target.matches('.modal__close') || !target.closest('.modal__content')) {
    target.closest('.modal').classList.remove('open');
    bodyController.unLockBody();
    target.closest('.modal').removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModalOnButton);
  }
}
function closeModalOnButton(event) {
  if (!bodyController.isInteraction) return;
  if (event.code === 'Escape') {
    const modal = document.querySelector('.modal.open');
    modal.classList.remove('open');
    bodyController.unLockBody();
    modal.removeEventListener('click', closeModal);
    window.removeEventListener('keydown', closeModalOnButton);
  }
}

// card menu ====================================================================================================

class MenuCard {
  constructor(imgSrc, imgAlt, title, description, price) {
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.title = title;
    this.description = description;
    this.price = price;
    for (var _len = arguments.length, classes = new Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
      classes[_key - 5] = arguments[_key];
    }
    classes.length > 0 ? this.classes = classes : this.classes = ['menu__item'];
  }
  createElement(containerSelector) {
    const wrapper = document.createElement('div');
    wrapper.classList.add(...this.classes);
    wrapper.innerHTML = `
			<img src=${this.imgSrc} alt=${this.imgAlt}>
			<h3 class="menu__item-subtitle">${this.title}</h3>
			<div class="menu__item-descr">${this.description}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
				<div class="menu__item-cost">Цена:</div>
				<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
			</div>
		`;
    document.querySelector(containerSelector).append(wrapper);
  }
}

// form ----------------------------------------------------------------------------------------------------

const forms = document.querySelectorAll('form');
forms.forEach(form => processForm(form));
const messageForUser = {
  success: 'Спасибо за заказ!',
  loading: 'icons/spinner.svg',
  error: 'Ошибка!'
};
const postData = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: data
  });
  return await response.json();
};
const getData = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Can't fetch url: ${response.url}, status: ${response.status}`);
  }
  return await response.json();
};
function processForm(form) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    const statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    statusMessage.innerHTML = `<img src=${messageForUser.loading} alt="Icon loading">`;
    form.after(statusMessage);
    const formData = new FormData(form);
    const formDataJson = JSON.stringify(Object.fromEntries(formData.entries()));
    postData('http://localhost:3000/requests', formDataJson).then(() => {
      closeMod();
      setTimeout(() => {
        openModalThanks(messageForUser.success);
      }, 600);
    }).catch(() => {
      closeMod();
      setTimeout(() => {
        openModalThanks(messageForUser.error);
      }, 600);
    }).finally(() => {
      statusMessage.remove();
      form.reset();
    });
  });
}
function closeMod() {
  const activeModal = document.querySelector('.modal.open');
  if (!activeModal) return;
  bodyController.unLockBody();
  activeModal.classList.remove('open');
  activeModal.removeEventListener('click', closeModal);
  window.removeEventListener('keydown', closeModalOnButton);
}
function openModalThanks(message) {
  if (!bodyController.isInteraction) return;
  const thanksModal = document.querySelector('#thanks-modal'),
    modalTitle = thanksModal.querySelector('.modal__title');
  modalTitle.textContent = message;
  bodyController.lockBody();
  thanksModal.classList.add('open');
  thanksModal.addEventListener('click', closeModal);
  window.addEventListener('keydown', closeModalOnButton);
}
getData('http://localhost:3000/menu').then(data => {
  data.forEach(_ref => {
    let {
      img,
      altimg,
      title,
      descr,
      price
    } = _ref;
    new MenuCard(img, altimg, title, descr, price).createElement('.menu__field .container');
  });
}).catch(e => console.log(e));
/******/ })()
;
//# sourceMappingURL=script.js.map