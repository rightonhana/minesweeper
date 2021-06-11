import { MouseEvent } from "react";
import LevelData from "../../types/LevelData";

/** AppMenu props */
export interface AppMenuProps {
	/** Current game time */
	timer: number;
	/** Is game started */
	gameStarted: boolean;
	/** Reset game function */
	resetGame: () => void;
	/** Start game function */
	startGame: () => void;
	/** Change game level function */
	onChangeDifficult: (level: LevelData) => (event: MouseEvent<HTMLLIElement>) => void;
}

export default AppMenuProps;