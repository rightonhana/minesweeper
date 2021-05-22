import MinesweeperState from "../../types/MinesweeperState";
import Tuple from "../../types/Tuple";
import setCellValue from "../setCellValue";
import setMineRadius from "./setMinesRadius";

/**
 * Set mine based on a [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Mine position
 */
export const setMine = (state: MinesweeperState[][], [x, y]: Tuple<number>) => setCellValue(setMineRadius(state, [x, y]), [x, y], {
	...state[x][y],
	mine: true,
});

export default setMine;