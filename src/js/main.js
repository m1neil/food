'use strict';
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
