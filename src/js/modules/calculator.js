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
};

export default calculatorInit;