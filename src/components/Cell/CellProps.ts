import { ElementProps } from "../../types/ElementProps";

/** Cell props */
export interface CellProps extends ElementProps<"button"> {
	/** Is a Mine */
	mine: boolean;
	/** Cell discovered */
	discovered: boolean;
	/** Is flagged */
	flag: boolean;
	/** Cell value */
	value: number;
}

export default CellProps;