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

	console.log(bodyController.isInteraction);
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
