const transitionDuration = 500;
const senoid = (t) => (1 - Math.cos(t*Math.PI))/2;
const downup = (t) => Math.abs(t*2 - 1);
const updown = (t) => 1 - downup(t);

function animate(step) {
	const t0 = Date.now();
	const interval = setInterval(() => {
		const t1 = Date.now();
		const dt = t1 - t0;
		const t = Math.min(1, dt/transitionDuration);
		if (t === 1) {
			clearInterval(interval);
		}
		step(t);
	}, 0);
}

function transition(img, src) {
	let changed = false;
	animate(t => {
		img.style.transform = `rotate(${senoid(t)*360}deg)`;
		img.style.filter = `blur(${updown(t)*10}px)`;
		img.style.opacity = downup(t)*0.8 + 0.2;
		if (t >= 0.5 && changed === false) {
			img.src = src;
			changed = true;
		}
	});
};
