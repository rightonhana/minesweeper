import MinesweeperState from "../../types/MinesweeperState";

/**
 * Return the current flags used on the stage
 * @param state Minesweeper state matrix
 */
export const flagsUsed = (state: MinesweeperState[][]) => state.reduce((output, row) => {
	return row.reduce((output, column) => {
		return column.flag
		? output + 1
		: output
	}, 0) + output;
}, 1)

export default flagsUsed;