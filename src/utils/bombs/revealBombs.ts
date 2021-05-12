import MinesweeperState from "../../types/MinesweeperState";

/**
 * Reveal all level bombs
 * @param state Minesweeper state matrix
 */
export const revealBombs = (state: MinesweeperState[][]) => 
	state.map((row: MinesweeperState[]) =>
		row.map((column: MinesweeperState) =>
			column.bomb ? { ...column, discovered: true } : column));

export default revealBombs;