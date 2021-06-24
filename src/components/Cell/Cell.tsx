import { css } from "@emotion/css";
import Flag from "@material-ui/icons/Flag";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { FC } from "react";
import CellProps from "./CellProps";

export const Cell: FC<CellProps> = ({ 
	mine,
	discovered,
	flag,
	value,
	...props
}) => (
	<button className={css`
		align-items: center;
		background-color: ${ discovered ? "var(--cell-discovered)" : "var(--primary-color)" };
		border-radius: 10%;
		border: 1rem solid ${ discovered ? "var(--cell-discovered)" : "var(--cell-undiscovered)" } transparent;
		color: ${ (discovered && !mine) ? `var(--number${value})` : "var(--text)" };
		display: flex;
		font-size: 1rem;
		font-weight: 900;
		height: 2rem;
		justify-content: center;
		margin: 0;
		user-select: none;
		width: 2rem;
		${discovered ? "pointer-events: none;" : "cursor: pointer;"}

		:hover {
			background-color: ${discovered ? "var(--cell-discovered)" : "var(--primary-color-hover)"};
		}

		svg {
			width: 2rem;
			height: 2rem;
			fill: var(--text);
		}
	`} disabled={discovered} {...props}>
		{ flag 
			? <Flag style={{fill: discovered ? "var(--primary-color)" : "var(--text)"}}/>
			: (discovered
				? (mine ? <HighlightOffIcon style={{fill: "black"}} /> : value)
				: "")
		}
	</button>
);

export default Cell;