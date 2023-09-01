const getData = async url => {
	const request = await fetch(url);

	if (!request.ok) {
		throw new Error(`not fetch data to url ${url}, status = ${request.status}`);
	}

	return await request.json();
};

const sendData = async (url, data) => {
	const request = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
		body: data,
	});

	if (!request.ok) {
		throw new Error(
			`Error send data url: ${request.url} status: ${request.status}`
		);
	}
};

const bodyController = {
	widthScroll: window.innerWidth - document.documentElement.clientWidth,
	unLockModal: true,
	timeBlock: 600,

	blockBody() {
		document.body.classList.add('lock');
		document.body.style.paddingRight = `${this.widthScroll}px`;

		this.unLockModal = false;
		setTimeout(() => {
			this.unLockModal = true;
		}, this.timeBlock);
	},

	unBlockBody() {
		this.unLockModal = false;
		setTimeout(() => {
			this.unLockModal = true;
			document.body.classList.remove('lock');
			document.body.style.paddingRight = '';
		}, this.timeBlock);
	},
};


export { getData, sendData, bodyController };