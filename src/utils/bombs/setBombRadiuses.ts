import MinesweeperState from "../../types/MinesweeperState";
import Tuple from "../../types/Tuple";
import setBom from "./setBomb";

/**
 * Set level bombs on stage and its radiuses values
 * @param state Minesweeper state matrix
 * @param bombsPosition Bombs position
 */
export const setBombsRadiuses = (
	state: MinesweeperState[][],
	bombsPosition: Tuple<number>[]
) => bombsPosition.reduce(setBom, state);

export default setBombsRadiuses;
