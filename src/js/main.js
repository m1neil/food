'use strict';
import tabs from './modules/tabs';
import { getData } from './modules/services';
import { timer } from './modules/timer';
import { openModal } from './modules/modal';
import { MenuCard } from './modules/menuCard';
import { formController } from './modules/form';
import slider from './modules/slider';
import calculatorInit from './modules/calculator';

tabs();
timer('.promotion__timer', '2023/09/5');

const btns = document.querySelectorAll('[data-modal]');
const modal = document.querySelector('.modal');

btns.forEach(btn => {
	btn.addEventListener('click', () => {
		openModal(modal);
	});
});

getData('http://localhost:3000/menu').then(data => {
	data.forEach(({ img, altimg, title, descr, price }) => {
		new MenuCard(img, altimg, title, descr, price, 'menu__item').createElement(
			'.menu__field .container'
		);
	});
});

// FORM ----------------------------------------------------------------------------------------------------
const forms = document.querySelectorAll('form');
forms.forEach(form => formController(form));

// slider  ----------------------------------------------------------------------------------------------------
slider({
	sliderSelector: '.offer__slider',
	fieldSliderSelector: '.offer__slides',
	slidesSelector: '.offer__slide',
	btnPrevSelector: '.offer__slider-prev',
	btnNextSelector: '.offer__slider-next',
	currentSlideSelector: '#current',
	totalSlideSelector: '#total',
	paginationSelector: '.offer__pagination',
});

// calculator ====================================================================================================================
calculatorInit();

