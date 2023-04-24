type ThrottleFunction<T extends any[]> = (this: unknown, ...args: T) => void;

function throttle<T extends any[]>(
	func: ThrottleFunction<T>,
	delay: number
): ThrottleFunction<T> {
	let lastTime = 0;
	let timer: ReturnType<typeof setTimeout> | null = null;
	return function (this: unknown, ...args: T) {
		const currentTime = Date.now();
		const timeSinceLastCall = currentTime - lastTime;
		if (timer) clearTimeout(timer);
		if (timeSinceLastCall > delay) {
			func.apply(this, args);
			lastTime = currentTime;
		} else {
			timer = setTimeout(() => {
				func.apply(this, args);
				lastTime = Date.now();
			}, delay - timeSinceLastCall);
		}
	};
}

export default throttle;
