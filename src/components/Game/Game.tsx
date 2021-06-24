import { css } from "@emotion/css";
import { FC } from "react";
import { Cell } from "../Cell/Cell";
import GameProps from "./GameProps";

export const Game: FC<GameProps> = ({
	onCellClick,
	stage = [[]],
	width = 0,
	...props
}) => {
	return (
		<div
			className={css`
				max-width: calc(${width} + (0.2rem * ${width}));
				display: grid;
				grid-template-rows: repeat(
					${stage.length},
					calc(${width} / ${stage[0].length})px
				);
				grid-template-columns: repeat(${stage[0].length}, 1fr);
				grid-gap: 0.2rem;
			`} {...props} >
			{stage.map((row, x) =>
				row.map((cell, y) => 
					<Cell 
						{...cell}
						key={x + y}
						onClick={(event) => onCellClick(event, [x, y])}
						onContextMenu={(event) => onCellClick(event, [x, y])}
					/>)
			)}
		</div>
	);
}
export default Game;
