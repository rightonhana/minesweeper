/** Alert props */
export interface AlertProps {
	/** Message to render */
	message: string;
	/** Is Alert open */
	open: boolean;
	/** Handle close function */
	handleClose: () => void;
}

export default AlertProps;