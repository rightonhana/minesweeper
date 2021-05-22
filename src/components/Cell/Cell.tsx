import { css } from "@emotion/css";
import { FC } from "react";
import { ReactComponent as Bomb } from "../../assets/bomb.svg";
import { ReactComponent as Flag } from "../../assets/flag.svg";
import CellProps from "./CellProps";

/**TODO: 
 * - Change icons
 * - Clear code
 */
export const Cell: FC<CellProps> = ({ 
	mine,
	discovered,
	flag,
	value,
	...props
}) => (
	<button className={css`
		color: ${
			(discovered && !mine && value === 0)
				? "var(--number0)"
				: (discovered && !mine && value === 1)
					? "var(--number1)"
					: (discovered && !mine && value === 2)
						? "var(--number2)"
						: (discovered && !mine && value === 3)
							? "var(--number3)"
							: (discovered && !mine && value === 4)
								? "var(--number4)"
								: (discovered && !mine && value === 5)
									? "var(--number5)"
									: (discovered && !mine && value === 6)
										? "var(--number6)"
										: (discovered && !mine && value === 7)
											? "var(--number7)"
											: (discovered && !mine && value === 8)
												? "var(--number8)"
												: "var(--text)"
		};

		align-items: center;
		border: 1rem solid ${ discovered ? "var(--cell-discovered)" : "var(--cell-undiscovered)"} transparent;
		border-radius: 10%;
		display: flex;
		font-size: 1rem;
		font-weight: bold;
		height: 2rem;
		justify-content: center;
		margin: 0;
		width: 2rem;
		background-color: ${discovered ? "#ccc" : "rgba(20,30,48, 0.9);"};
		user-select: none;
		${discovered ? "pointer-events: none;" : "cursor: pointer;"}

		:hover {
			background-color: ${discovered ? "#ccc" : "rgba(20,30,48, 1)"};
		}

		svg {
			width: 2rem;
			height: 2rem;
			fill: var(--text);
		}
	`} disabled={discovered} {...props}>
		{ flag ? <Flag/> : (!discovered ? "" : (discovered && mine ? <Bomb/> : value)) }
	</button>
);

export default Cell;