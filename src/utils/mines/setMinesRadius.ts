import MinesweeperState from "../../types/MinesweeperState";
import { Tuple } from "../../types/Tuple";
import incrementCellValue from "../incrementCellValue";

/**
 * Set cell values of mine radius
 * @param state Minesweeper state matrix
 * @param param1 Mine position
 */
export const setMineRadius = (
	state: MinesweeperState[][],
	[x, y]: Tuple<number>
) => ([
		[x - 1, y - 1],
		[x - 1, y],
		[x - 1, y + 1],
		[x, y - 1],
		[x, y + 1],
		[x + 1, y - 1],
		[x + 1, y],
		[x + 1, y + 1],
] as Tuple<number>[]).reduce(incrementCellValue, state);

export default setMineRadius;
