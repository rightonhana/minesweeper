import MinesweeperState from "../types/MinesweeperState";
import Tuple from "../types/Tuple";
import discoverEmptyZone from "./discoverEmptyZone";
import { revealMines } from "./mines/revealMines";
import minesNearby from "./minesNearby";
import setDiscovered from "./setDiscovered";

/**
 * Discover a zone
 * @param state Minesweeper state matrix
 * @param param1 Position clicked
 */
const discoverZone = (state: MinesweeperState[][], [x, y]: Tuple<number>) => {
	return state[x][y].mine
		? revealMines(state)
		: (!state[x][y].flag && minesNearby(state, [x, y])
			? setDiscovered(state, [x, y])
			: discoverEmptyZone(state, [x, y]));
}

export default discoverZone;