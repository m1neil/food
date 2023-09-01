'use strict';

// TABS ----------------------------------------------------------------------------------------------------

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
		tabNavItems.forEach(item =>
			item.classList.remove('tabheader__item_active')
		);
	}

	function showCurrentTabContent(i = 0) {
		tabContents[i].classList.add('tabcontent_active');
		tabNavItems[i].classList.add('tabheader__item_active');
	}
};

tabs();

// CLASS MENU-CARD----------------------------------------------------------------------------------------------------
class MenuCard {
	constructor(
		src = 'src',
		alt = 'alt',
		title = 'title',
		text = 'text',
		price = 435,
		...classes
	) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.text = text;
		this.price = this.convertToUAH(price).toFixed(2);

		classes.length > 0
			? (this.classes = classes)
			: (this.classes = ['menu__item']);
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

//----------------------------------------------------------------------------------------------------

const getData = async url => {
	const request = await fetch(url);

	if (!request.ok) {
		throw new Error(`not fetch data to url ${url}, status = ${request.status}`);
	}

	return await request.json();
};

getData('http://localhost:3000/menu').then(data => {
	data.forEach(({ img, altimg, title, descr, price }) => {
		new MenuCard(img, altimg, title, descr, price, 'menu__item').createElement(
			'.menu__field .container'
		);
	});
});

// TIMER ----------------------------------------------------------------------------------------------------

const deadline = '2023/08/14';

setTimer('.promotion__timer', deadline);

function getLastTime(deadline) {
	const t = Date.parse(deadline) - Date.parse(new Date());

	let days = 0,
		hours = 0,
		minutes = 0,
		seconds = 0;

	if (t > 0) {
		days = Math.floor(t / (1000 * 60 * 60 * 24));
		hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		minutes = Math.floor((t / 1000 / 60) % 60);
		seconds = Math.floor((t / 1000) % 60);
	}

	return {
		total: t,
		days,
		hours,
		minutes,
		seconds,
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

function addZero(value) {
	return value < 10 ? `0${value}` : value;
}

// body controller ----------------------------------------------------------------------------------------------------

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
	},
};

// Modal ----------------------------------------------------------------------------------------------------

const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');

btns.forEach(btn => {
	btn.addEventListener('click', () => {
		openModal(modal);
	});
});

function openModal(modal) {
	if (!bodyController.unLockModal) return;

	modal.classList.add('open');
	bodyController.blockBody();

	modal.addEventListener('click', closeModal);
	window.addEventListener('keydown', closeModal);
}

function closeModal(event) {
	const target = event.target;
	const modal = document.querySelector('.modal.open');

	if (!bodyController.unLockModal) return;

	if (
		event.code === 'Escape' ||
		target === modal ||
		target.hasAttribute('data-close-modal')
	) {
		deleteActiveClassOpenModal(modal);
	}
}

function deleteActiveClassOpenModal(modal) {
	modal.classList.remove('open');
	bodyController.unBlockBody();
	modal.removeEventListener('click', closeModal);
	window.removeEventListener('keydown', closeModal);
}

// FORM ----------------------------------------------------------------------------------------------------

const forms = document.querySelectorAll('form');

const statusLoad = {
	loading: 'icons/spinner.svg',
	success: 'Спасибо за заказ',
	error: 'Что-то пошло не по плану',
};

const sendData = async (url, data) => {
	const request = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: data,
	});

	if (!request.ok) {
		throw new Error(
			`Error send data url: ${request.url} status: ${request.status}`
		);
	}
};

forms.forEach(form => formController(form));

function formController(form) {
	form.addEventListener('submit', event => {
		event.preventDefault();

		const message = document.createElement('div');
		message.classList.add('modal__loading');
		message.innerHTML = `<img src=${statusLoad.loading} alt="loading">`;
		form.after(message);

		const formData = new FormData(form);
		const parseForJson = JSON.stringify(Object.fromEntries(formData.entries()));

		sendData('http://localhost:3000/requests', parseForJson)
			.then(() => {
				sayThanks(statusLoad.success);
			})
			.catch(error => {
				console.log(error);
				sayThanks(statusLoad.error);
			})
			.finally(() => {
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
		deleteActiveClassOpenModal(activeModal);
		setTimeout(() => {
			openModal(modalThanks);
		}, bodyController.timeBlock);
	} else {
		openModal(modalThanks);
	}
}

// slider  ----------------------------------------------------------------------------------------------------

const slider = document.querySelector('.offer__slider');
const fieldSlider = slider.querySelector('.offer__slides');
const slides = slider.querySelectorAll('.offer__slide');
const btnPrev = slider.querySelector('.offer__slider-prev');
const btnNext = slider.querySelector('.offer__slider-next');
const currentSlide = document.querySelector('#current');
const totalSlide = document.querySelector('#total');
const pagination = document.querySelector('.offer__pagination');

currentSlide.textContent = addZero(1);
totalSlide.textContent = addZero(slides.length);

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
		currentSlide.textContent = addZero(slideIndex);
		scroolX = widthSlide * index;
		fieldSlider.style.transform = `translateX(-${scroolX}px)`;
		activeCurrentPagination(index);
	});
});

function activeCurrentPagination(index) {
	paginationBtns.forEach(btn =>
		btn.classList.remove('offer__btn-pagination_active')
	);
	paginationBtns[index].classList.add('offer__btn-pagination_active');
}

function sliderLif(direction = 'next') {
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
	currentSlide.textContent = addZero(slideIndex);
	activeCurrentPagination(slideIndex - 1);
}

// calculator ====================================================================================================================
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
		})
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
		totalResult = (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity;
	} else if (gender === 'female') {
		totalResult = (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity;
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