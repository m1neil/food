import { addZero } from "./timer";

const slider = ({ sliderSelector, fieldSliderSelector, slidesSelector, btnPrevSelector, btnNextSelector, currentSlideSelector, totalSlideSelector, paginationSelector }) => {
	const slider = document.querySelector(sliderSelector);
	const fieldSlider = slider.querySelector(fieldSliderSelector);
	const slides = slider.querySelectorAll(slidesSelector);
	const btnPrev = slider.querySelector(btnPrevSelector);
	const btnNext = slider.querySelector(btnNextSelector);
	const currentSlide = document.querySelector(currentSlideSelector);
	const totalSlide = document.querySelector(totalSlideSelector);
	const pagination = document.querySelector(paginationSelector);

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
}

export default slider;