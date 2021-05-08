/**
 * Return a random integer based on a min and max value
 * @param min Minimum value
 * @param max Maximum value
 */
export const randomInteger = (min = 0, max = 1) =>
	Math.round(Math.random() * max + min);

export default randomInteger;
