import { bodyController } from "./services";

function openModal(modal) {
	if (!bodyController.unLockModal) return;

	modal.classList.add('open');
	bodyController.blockBody();

	modal.addEventListener('click', closeModal);
	window.addEventListener('keydown', closeModal);
}

function closeModal(event) {
	const target = event.target;
	const modal = document.querySelector('.modal.open');

	if (!bodyController.unLockModal) return;

	if (
		event.code === 'Escape' ||
		target === modal ||
		target.hasAttribute('data-close-modal')
	) {
		deleteActiveClassOpenModal(modal);
	}
}

function deleteActiveClassOpenModal(modal) {
	modal.classList.remove('open');
	bodyController.unBlockBody();
	modal.removeEventListener('click', closeModal);
	window.removeEventListener('keydown', closeModal);
}

export { openModal, closeModal, deleteActiveClassOpenModal }
