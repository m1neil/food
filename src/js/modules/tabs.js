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

export default tabs;