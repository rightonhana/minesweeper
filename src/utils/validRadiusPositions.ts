import MinesweeperState from "../types/MinesweeperState";
import { Tuple } from "../types/Tuple";
import validXY from "./validXY";

/**
 * Return the valid neighbors positions of a given [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Position get the valid neighbors positions
 */
export const validRadiusPositions = (
	state: MinesweeperState[][],
	[x, y]: Tuple<number>
) => {
	return ([
		[x - 1, y - 1],
		[x - 1, y],
		[x - 1, y + 1],
		[x, y - 1],
		[x, y],
		[x, y + 1],
		[x + 1, y - 1],
		[x + 1, y],
		[x + 1, y + 1],
	] as Tuple<number>[]).reduce((validPositions, currentValue) => {
		return validXY(state, currentValue) ? [...validPositions, currentValue] : validPositions;
	}, [] as Tuple<number>[]);
};

export default validRadiusPositions;
