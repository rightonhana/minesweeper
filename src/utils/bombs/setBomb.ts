import MinesweeperState from "../../types/MinesweeperState";
import Tuple from "../../types/Tuple";
import setCellValue from "../setCellValue";
import setBombRadius from "./setBombRadius";

/**
 * Set bomb based on a [x, y]
 * @param state Minesweeper state matrix
 * @param param1 Bomb position
 */
export const setBom = (state: MinesweeperState[][], [x, y]: Tuple<number>) => setCellValue(setBombRadius(state, [x, y]), [x, y], {
	...state[x][y],
	bomb: true,
});

export default setBom;