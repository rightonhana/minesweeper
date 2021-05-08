import MinesweeperState from "../types/MinesweeperState";
import { Tuple } from "../types/Tuple";
import validXY from "./validXY";

/**
 * Set a Cell value based on a given [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Cell position to be updated
 * @param value value to update
 */
export const setCellValue = (
	state: MinesweeperState[][],
	[x, y]: Tuple<number>,
	value: MinesweeperState
) =>
	validXY(state, [x, y])
		? [
			...state.slice(0, x),
			[...state[x].slice(0, y), value, ...state[x].slice(y + 1)],
			...state.slice(x + 1),
		]
		: state;

export default setCellValue;
