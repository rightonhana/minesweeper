import MinesweeperState from "../types/MinesweeperState";
import { Tuple } from "../types/Tuple";
import setCellValue from "./setCellValue";
import validXY from "./validXY";

/**
 * Increment cell value based on a given [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Position [x, y]
 */
export const incrementCellValue = (
	state: MinesweeperState[][],
	[x, y]: Tuple<number>
) =>
	validXY(state, [x, y])
		? setCellValue(state, [x, y], {
			...state[x][y],
			value: state[x][y].value + 1,
		})
		: state;

export default incrementCellValue;
