import { css } from "@emotion/css";
import { FC } from "react";
import { Cell } from "../Cell/Cell";
import StageProps from "./StageProps";

export const Stage: FC<StageProps> = ({
	onCellClick,
	stage = [[]],
	width = 0,
	...props
}) => {
	return (
		<div
			className={css`
				width: 100%;
				max-width: ${width}rem;
				display: grid;
				margin: 0;
				grid-template-rows: repeat(
					${stage.length},
					calc(${width} / ${stage[0].length})rem
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
export default Stage;
