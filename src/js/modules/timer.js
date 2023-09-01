const timer = (selector, deadline) => {

	setTimer(selector, deadline);

	function getLastTime(deadline) {
		const t = Date.parse(deadline) - Date.parse(new Date());

		let days = 0,
			hours = 0,
			minutes = 0,
			seconds = 0;

		if (t > 0) {
			days = Math.floor(t / (1000 * 60 * 60 * 24));
			hours = Math.floor((t / (1000 * 60 * 60)) % 24);
			minutes = Math.floor((t / 1000 / 60) % 60);
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			total: t,
			days,
			hours,
			minutes,
			seconds,
		};
	}

	function setTimer(selector, deadline) {
		const timer = document.querySelector(selector);

		if (!timer) return;

		const days = timer.querySelector('#days');
		const hours = timer.querySelector('#hours');
		const minutes = timer.querySelector('#minutes');
		const seconds = timer.querySelector('#seconds');

		updateTimer();

		const pushTime = setInterval(updateTimer, 1000);

		function updateTimer() {
			const time = getLastTime(deadline);

			if (time.total < deadline) {
				clearInterval(pushTime);
			} else {
				days.textContent = addZero(time.days);
				hours.textContent = addZero(time.hours);
				minutes.textContent = addZero(time.minutes);
				seconds.textContent = addZero(time.seconds);
			}
		}
	}
}

function addZero(value) {
	return value < 10 ? `0${value}` : value;
}

export { timer, addZero }

