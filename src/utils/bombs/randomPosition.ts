import Tuple from "../../types/Tuple";
import randomInteger from "./randomInteger";

/**
 * Return a random [x, y]
 * @param cols Column number
 * @param rows Rows number
 */
export const randomPosition = (cols = 0, rows = 0): Tuple<number> => [
	randomInteger(0, cols - 1),
	randomInteger(0, rows - 1),
];

export default randomPosition;
