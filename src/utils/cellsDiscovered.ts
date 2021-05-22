import MinesweeperState from "../types/MinesweeperState";

/**
 * Total number of cells discovered
 * @param state Minesweeper state matrix
 */
export const cellsDiscovered = (state: MinesweeperState[][]) => state.reduce((total, rows) => {
	return rows.reduce((acc, cell) => {
		return cell.discovered && !cell.mine ? acc + 1 : acc;
	},0) + total;
}, 0);

export default cellsDiscovered;