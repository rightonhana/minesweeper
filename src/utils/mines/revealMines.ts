import MinesweeperState from "../../types/MinesweeperState";

/**
 * Reveal all level mines
 * @param state Minesweeper state matrix
 */
export const revealMines = (state: MinesweeperState[][]) => 
	state.map((row: MinesweeperState[]) =>
		row.map((column: MinesweeperState) =>
			column.mine ? { ...column, discovered: true } : column));

export default revealMines;