import MinesweeperState from "../../types/MinesweeperState";
import Tuple from "../../types/Tuple";
import setMine from "./setMines";

/**
 * Set level mines on stage and its radiuses values
 * @param state Minesweeper state matrix
 * @param minesPosition Mines position
 */
export const setMinesRadiuses = (
	state: MinesweeperState[][],
	minesPosition: Tuple<number>[]
) => minesPosition.reduce(setMine, state);

export default setMinesRadiuses;
