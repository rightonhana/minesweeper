import { Tuple } from "../types/Tuple";

/**
 * Validate a position in a matrix
 * @param matrix Matrix
 * @param param1 Position [x, y]
 */
export const validXY = <Item = unknown>(
	matrix: Item[][],
	[x, y]: Tuple<number>
) => x >= 0 && x < matrix.length && y >= 0 && y < matrix[x].length;

export default validXY;
