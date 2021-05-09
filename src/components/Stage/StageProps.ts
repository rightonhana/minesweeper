import { MouseEvent } from "react";
import { ElementProps } from "../../types/ElementProps";
import MinesweeperState from "../../types/MinesweeperState";
import { Tuple } from "../../types/Tuple";

/** Stage props */
export interface StageProps extends ElementProps {
	/** Stage width */
	width: number;
	/** Stage data */
	stage: MinesweeperState[][];
	/** Cell clicked event */
	onCellClick: (event: MouseEvent<HTMLButtonElement>, position: Tuple<number>) => void;
}

export default StageProps;