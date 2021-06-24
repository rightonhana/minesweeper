import { AppBar, Button, Menu, MenuItem, Toolbar } from '@material-ui/core';
import { FC, useState } from "react";
import { EASY } from '../../constants/easy';
import { HARD } from '../../constants/hard';
import { MEDIUM } from '../../constants/medium';
import Stopwatch from '../Stopwatch';
import styles from "./AppMenu.module.css";
import AppMenuProps from './AppMenuProps';

export const AppMenu: FC<AppMenuProps> = ({ 
	onChangeDifficult,
	timer,
	gameStarted,
	resetGame,
	startGame,
	...props
}) =>  {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="fixed" {...props}>
			<Toolbar className={styles.Toolbar}>
				<Stopwatch timer={timer} />
				{
					gameStarted
					? <Button color="inherit" onClick={resetGame}>Reset Game</Button>
					: <Button color="inherit" onClick={startGame}>Start Game</Button>
				}
				<Button
					aria-controls="simple-menu"
					aria-haspopup="true"
					color="inherit"
					onClick={handleClick}
				>
					Select Level
				</Button>
				<Menu
					id="simple-menu"
					anchorEl={anchorEl}
					keepMounted
					open={Boolean(anchorEl)}
					onClose={handleClose}
				>
					<MenuItem onClick={onChangeDifficult(EASY)}>Easy</MenuItem>
					<MenuItem onClick={onChangeDifficult(MEDIUM)}>Medium</MenuItem>
					<MenuItem onClick={onChangeDifficult(HARD)}>Hard</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
}

export default AppMenu;