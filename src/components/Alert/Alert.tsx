import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import { FC, forwardRef, ReactElement, Ref } from "react";
import AlertProps from './AlertProps';

const Transition = forwardRef(function Transition(
	props: TransitionProps & { children?: ReactElement<any, any> },
	ref: Ref<unknown>,
) {
return <Slide direction="up" ref={ref} {...props} />;
});

export const Alert: FC<AlertProps> = ({
	message,
	open,
	handleClose,
	...props
}) => <Dialog
	open={open}
	TransitionComponent={Transition}
	keepMounted
	onClose={handleClose}
	aria-labelledby="alert-dialog-slide-title"
	aria-describedby="alert-dialog-slide-description"
	{...props}
>
	<DialogContent>
		<DialogTitle id="alert-dialog-slide-title">
			{message}
		</DialogTitle>
	</DialogContent>
	<DialogActions>
		<Button onClick={handleClose} color="primary">
			Close
		</Button>
	</DialogActions>
</Dialog>

export default Alert;
