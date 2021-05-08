import MinesweeperState from "../types/MinesweeperState";

/**
 * Create a Stage with an initial state
 * @param width Stage width
 * @param height Stage height
 * @param initialState Initial state
 */
export const createStage = (
	width: number,
	height: number,
	initialState: MinesweeperState
): MinesweeperState[][] =>
	[...new Array(width)].fill([...new Array(height)].fill(initialState));

export default createStage;
