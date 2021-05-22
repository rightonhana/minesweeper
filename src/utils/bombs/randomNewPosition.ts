import Tuple from "../../types/Tuple";
import randomPosition from "./randomPosition";

/**
 * Return a different [x, y] (No duplicates with the currents [x, y] positions)
 * @param positions Current [x, y] positions
 * @param cols Columns number
 * @param rows Rows number
 * @param param1 [x, y] position to check
 */
export const randomNewPosition = (
	positions: Tuple<number>[],
	cols = 0,
	rows = 0,
	[firstX, firstY]: Tuple<number>
): Tuple<number> => {
	const position = randomPosition(cols, rows);

	return (firstX === position[0] && firstY === position[1])
		? randomNewPosition(positions, cols, rows, [firstX, firstY])
		: ( positions.some(
				([x, y] = [-1, -1]) => x === position[0] && y === position[1]
			)
			? randomNewPosition(positions, cols, rows, [firstX, firstY])
			: position
		);
		
};

export default randomNewPosition;
