const delay = (ms) => new Promise(f => setTimeout(f, ms));

const removeRandomItemFromSet = (set) => {
	const values = [...set];
	const i = Math.floor(Math.random()*values.length);
	const val = values[i];
	set.delete(val);
	return val;
};

const randomizeGroup = async (div, cards) => {
	const set = new Set(cards);
	const imgs = div.querySelectorAll('img');
	for (const img of imgs) {
		const name = removeRandomItemFromSet(set);
		const src = `./img/pixel-${name}.png`;
		transition(img, src);
		await delay(100);
	}
};

[...document.querySelectorAll('div[group-type]')].forEach(div => {
	const type = div.getAttribute('group-type');
	const cards = cardGroup[type];
	const button = div.querySelector('button');
	button.onclick = () => {
		randomizeGroup(div, cards);
	};
});
