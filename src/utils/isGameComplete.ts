import LevelData from "../types/LevelData";
import MinesweeperState from "../types/MinesweeperState";
import cellsDiscovered from "./cellsDiscovered";

/**
 * Checks if the game is complete (win)
 * @param state Minesweeper state matrix
 * @param level Level information
 */
export const isGameComplete = (state: MinesweeperState[][], level: LevelData): boolean => {
	const cellsWithoutMines = level.width * level.height - level.bombs;
	const currentCellsDiscovered = cellsDiscovered(state) - level.bombs;
	return currentCellsDiscovered === cellsWithoutMines;
}

export default isGameComplete;