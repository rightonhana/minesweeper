import MinesweeperState from "../types/MinesweeperState";
import Tuple from "../types/Tuple";
import validPositions from "./validPositions";

/**
 * Checks if there are mines nearby
 * @param state Minesweeper state matrix
 * @param param1 Position to check
 */
export const minesNearby = (state: MinesweeperState[][], [x, y]: Tuple<number>): boolean => 
	validPositions(state, [x, y]).some(([currentX, currentY]) => state[currentX][currentY].mine);


export default minesNearby;