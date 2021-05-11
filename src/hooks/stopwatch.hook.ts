import { useCallback, useRef, useState } from "react";

export const useStopwatch = (initialState = 0) => {
	const [timer, setTimer] = useState(initialState);
	const interval = useRef<NodeJS.Timeout>();

	const cleanUp = useCallback(() => {
		if (interval.current) {
			clearInterval(interval.current);
		}
	}, []);

	const startStopwatch = useCallback(() => {
		cleanUp();
		interval.current = setInterval(() => {
			setTimer((timer) => timer + 1)
		}, 1000);
	}, [cleanUp]);

	const pauseStopwatch = useCallback(() => {
		cleanUp();
	}, [cleanUp]);

	const resetStopwatch = useCallback(() => {
		cleanUp();
		setTimer(0);
	}, [cleanUp]);

	return { timer, startStopwatch, pauseStopwatch, resetStopwatch };
}

export default useStopwatch;