import { openModal, deleteActiveClassOpenModal } from './modal';
import { sendData, bodyController } from './services';

const statusLoad = {
	loading: 'icons/spinner.svg',
	success: 'Спасибо за заказ',
	error: 'Что-то пошло не по плану',
};

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

export { formController }