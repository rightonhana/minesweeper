import MinesweeperState from "../types/MinesweeperState";
import Tuple from "../types/Tuple";
import minesNearby from "./minesNearby";
import setDiscovered from "./setDiscovered";
import validPositions from "./validPositions";

/**
 * Discover an empty zone
 * @param state Minesweeper state matrix
 * @param param1 Position clicked
 */
export const discoverEmptyZone = (state:MinesweeperState[][], [x,y]:Tuple<number>): MinesweeperState[][] => 
	!state[x][y].mine && !minesNearby(state, [x,y])
		? validPositions(state, [x, y]).reduce((newState: MinesweeperState[][], [validPositionX, validPositionY]: Tuple<number>)=> {
			return !newState[validPositionX][validPositionY].flag
				? setDiscovered(newState, [validPositionX, validPositionY])
				: newState;
			}, state)
		: state;

export default discoverEmptyZone;
