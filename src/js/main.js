const navWrapper = document.querySelector('.tabheader__items');
const navTabs = navWrapper.querySelectorAll('.tabheader__item');
const tabsContent = document.querySelectorAll('.tabcontent');

const hideNavigationItem = () => {
	navTabs.forEach(item => {
		item.classList.remove('tabheader__item_active');
	});
};

const hideTabsContent = () => {
	tabsContent.forEach(item => {
		item.classList.remove('tabcontent_active');
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
