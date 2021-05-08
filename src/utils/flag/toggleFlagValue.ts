import MinesweeperState from "../../types/MinesweeperState";
import { Tuple } from "../../types/Tuple";
import setCellValue from "../setCellValue";

/**
 * Toggle flag value based on a given [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Cell position to be updated
 */
export const toggleFlagValue = (state: MinesweeperState[][], [x, y]: Tuple<number>, value:boolean) => setCellValue(state, [x, y], {
	...state[x][y],
	flag: !value,
});

export default toggleFlagValue;