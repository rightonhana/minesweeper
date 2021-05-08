import Tuple from "../../types/Tuple";
import randomNewPosition from "./randomNewPosition";

/**
 * Generate bombs positions
 * @param cols Column number
 * @param rows Rows number
 * @param bombs Bombs number
 * @param param1 [x, y] position
 */
export const generateBombsPositions = (
	cols: number,
	rows: number,
	bombs: number,
	[x, y]: Tuple<number>
): Tuple<number>[] => {
	/**
	 * Takes an array of bombs and returns a random x and y avoiding duplication.
	 * @param array [x, y] positions
	 * @param param1 [x, y] position
	 * @param index Index value
	 */
	const loop = (array: Tuple<number>[], [x, y]: Tuple<number>, index = 0): Tuple<number>[] => {
		const newArray = [
		...array.slice(0, index),
		randomNewPosition(array, cols, rows, [x, y]),
		...array.slice(index + 1),
		];

		return index + 1 === array.length ? newArray : loop(newArray, [x, y], index + 1);
	};

	return loop([...new Array(bombs)], [x, y]);
};

export default generateBombsPositions;
