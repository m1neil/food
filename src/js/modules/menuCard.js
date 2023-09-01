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

export { MenuCard }