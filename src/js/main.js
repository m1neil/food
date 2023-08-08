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

const showTabAndNavItem = (index = 0) => {
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
		seconds: 0,
	};

	if (timer.total > 0) {
		timer.days = Math.floor(timer.total / (1000 * 60 * 60 * 24));
		timer.hours = Math.floor((timer.total / (1000 * 60 * 60)) % 24);
		timer.minutes = Math.floor((timer.total / 1000 / 60) % 60);
		timer.seconds = Math.floor((timer.total / 1000) % 60);
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
	},
};

const btnLinks = document.querySelectorAll('[data-modal]');

if (btnLinks.length) {
	btnLinks.forEach(btn => {
		btn.addEventListener('click', openModal);
	});
}

function openModal(event) {
	const target = event.target;

	if (
		target?.getAttribute('data-modal') &&
		document.querySelector(target.getAttribute('data-modal')) &&
		bodyController.isInteraction
	) {
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

	if (
		(target && target.matches('.modal__close')) ||
		!target.closest('.modal__content')
	) {
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
	constructor(imgSrc, imgAlt, title, description, price, ...classes) {
		this.imgSrc = imgSrc;
		this.imgAlt = imgAlt;
		this.title = title;
		this.description = description;
		this.price = price;
		classes.length > 0
			? (this.classes = classes)
			: (this.classes = ['menu__item']);
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

new MenuCard(
	'img/tabs/vegy.jpg',
	'vegy',
	'Меню "Фитнес"',
	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	229
).createElement('.menu__field .container');

new MenuCard(
	'img/tabs/elite.jpg',
	'elite',
	'Меню “Премиум”',
	'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
	550
).createElement('.menu__field .container');

new MenuCard(
	'img/tabs/post.jpg',
	'img/tabs/post.jpg',
	'Меню "Постное"',
	'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
	430
).createElement('.menu__field .container');

// form ----------------------------------------------------------------------------------------------------

const forms = document.querySelectorAll('form');
forms.forEach(form => processForm(form));

const messageForUser = {
	success: 'Спасибо за заказ!',
	loading: 'icons/spinner.svg',
	error: 'Ошибка!',
};

function processForm(form) {
	form.addEventListener('submit', event => {
		event.preventDefault();

		const statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		statusMessage.innerHTML = `<img src=${messageForUser.loading} alt="Icon loading">`;

		form.after(statusMessage);

		const formData = new FormData(form);

		fetch('php/server.php', {
			method: 'POST',
			body: formData,
		})
			.then(data => data.text())
			.then(data => {
				console.log(data);
				closeMod();
				setTimeout(() => {
					openModalThanks(messageForUser.success);
				}, 600);
			})
			.catch(() => {
				closeMod();
				setTimeout(() => {
					openModalThanks(messageForUser.error);
				}, 600);
			})
			.finally(() => {
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
