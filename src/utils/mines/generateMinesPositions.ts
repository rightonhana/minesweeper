import Tuple from "../../types/Tuple";
import randomNewPosition from "./randomNewPosition";

/**
 * Generate mines positions
 * @param cols Column number
 * @param rows Rows number
 * @param mines Mines number
 * @param param1 [x, y] position
 */
export const generateMinesPositions = (
	cols: number,
	rows: number,
	mines: number,
	[x, y]: Tuple<number>
): Tuple<number>[] => {
	/**
	 * Takes an array of mines and returns a random x and y avoiding duplication.
	 * @param positions [x, y] positions
	 * @param param1 [x, y] position
	 * @param index Index value
	 */
	const loop = (positions: Tuple<number>[], [x, y]: Tuple<number>, index = 0): Tuple<number>[] => {
		const newArray = [
		...positions.slice(0, index),
		randomNewPosition(positions, cols, rows, [x, y]),
		...positions.slice(index + 1),
		];

		return index + 1 === positions.length ? newArray : loop(newArray, [x, y], index + 1);
	};

	return loop([...new Array(mines)], [x, y]);
};

export default generateMinesPositions;
