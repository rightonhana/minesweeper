import MinesweeperState from "../types/MinesweeperState";

export const INITIAL_STATE: MinesweeperState = {
	bomb: false,
	discovered: false,
	flag: false,
	value: 0,
};