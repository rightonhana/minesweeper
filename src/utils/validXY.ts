import { Tuple } from "../types/Tuple";

/**
 * Validate a position in a matrix
 * @param matrix matrix
 * @param param1 position [x, y]
 */
export const validXY = <Item = unknown>(
	matrix: Item[][],
	[x, y]: Tuple<number>
) => x >= 0 && x < matrix.length && y >= 0 && y < matrix[x].length;

export default validXY;
