import MinesweeperState from "../types/MinesweeperState";
import { Tuple } from "../types/Tuple";
import setCellValue from "./setCellValue";
import validXY from "./validXY";

/**
 * Discover a cell based on a given [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Position get the valid neighbors positions
 */
export const setDiscovered = (state: MinesweeperState[][], [x, y]: Tuple<number>): MinesweeperState[][] => validXY(state, [x, y])
	? setCellValue(state, [x, y], {
		...state[x][y],
		discovered: true,
		})
	: state;

export default setDiscovered;