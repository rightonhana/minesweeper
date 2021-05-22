import { css } from "@emotion/css";
import { Button } from '@material-ui/core';
import { FC, MouseEvent } from "react";
import { EASY } from "../../constants/easy";
import { HARD } from "../../constants/hard";
import { MEDIUM } from "../../constants/medium";
import useGame from "../../hooks/game.hook";
import useStopwatch from "../../hooks/stopwatch.hook";
import LevelData from "../../types/LevelData";
import MinesweeperState from "../../types/MinesweeperState";
import Tuple from "../../types/Tuple";
import revealBombs from "../../utils/bombs/revealBombs";
import discoverEmptyZone from "../../utils/discoverEmptyZone";
import isGameComplete from "../../utils/isGameComplete";
import minesNearby from "../../utils/minesNearby";
import setDiscovered from "../../utils/setDiscovered";
import Stage from "../Stage";
import Stopwatch from "../Stopwatch";

export const Game: FC<{}> = ({ ...props }) => {
	const { timer, startStopwatch, pauseStopwatch, resetStopwatch } = useStopwatch(0);
	const { 
		stage,
		levelDifficult,
		firstClick,
		gameStarted,
		win,
		defeat,
		setStage,
		selectDifficult,
		toggleFlagCell,
		onFirstClick,
		onStartGame,
		onGameDefeat,
		onGameWin
	} = useGame(EASY);

	/**TODO:
	 * 		spread empty zone on click
	 * 		onDiscover -> <button disable> attribute,
	 * 		onDefeat -> disabled all buttons on stage
	 * 		when a all cells discovered -> u should win... but for some reason you not -> clock still running
	 * 
	 * 		update colors
	 */
	
	const startGame = () => {
		onStartGame();
		resetStopwatch();
		startStopwatch();
	}
	
	const resetGame = () => {
		onStartGame();
		resetStopwatch();
		startStopwatch();
	}
	
	const onWin = () => {
		onGameWin();
		pauseStopwatch();
	}
	
	const onDefeat = (state: MinesweeperState[][]) => {
		onGameDefeat();
		pauseStopwatch();
		return revealBombs(state)
	}
	
	const onChangeDifficult = (level: LevelData) => (event: MouseEvent<HTMLButtonElement>) => {
		selectDifficult(level)
		resetStopwatch();
	}
	
	const discoverZone = (state: MinesweeperState[][], [x, y]: Tuple<number>) =>
		state[x][y].bomb
			? onDefeat(state)
			: (!state[x][y].flag && minesNearby(state, [x, y])
				? setDiscovered(state, [x, y])
				: discoverEmptyZone(state, [x, y]));

	const updateCell = ([x, y]: Tuple<number>) => {
		if (!stage[x][y].flag) {
			if (firstClick) {
				if (timer === 0) {
					startStopwatch();
				}
				onFirstClick([x, y]);
			} else {
				setStage(discoverZone(stage, [x, y]));
				if (isGameComplete(stage, levelDifficult)) {
					onWin();
				}
			}
		}
	}

	const onClick = (event: MouseEvent, [x, y]: Tuple<number>) => {
		event.preventDefault();
		if (event.button === 2) {
			toggleFlagCell([x, y]);
		}
		if (event.button === 0) {
			updateCell([x, y]);
		}
	}

	return (
		<div className={css`
				width: 100vmin;
				display: flex;
				justify-content: flex-start;
				align-items: flex-start;
				padding: 1.5rem;

				.settings {
					display: flex;
					flex-direction: column;
					width: 15vw;
					margin: 2rem;
				}

				.levels {
					display: flex;
					align-items: center;
					justify-content: space-around;
					margin-bottom: 1rem;
				}
			`} {...props}>
			<section className="settings" >
				<Stopwatch timer={timer}/>
				<div className="levels" >
					<Button variant="outlined" color="primary" onClick={onChangeDifficult(EASY)} >Easy</Button>
					<Button variant="outlined" color="primary" onClick={onChangeDifficult(MEDIUM)} >Medium</Button>
					<Button variant="outlined" color="primary" onClick={onChangeDifficult(HARD)} >Hard</Button>
				</div>
				{ gameStarted
					? <Button variant="outlined" color="primary" onClick={resetGame} >Reset Game</Button>
					: <Button variant="outlined" color="primary" onClick={startGame} >Start Game</Button>
				}
				{ defeat ? "DEFEAT" : ""}
				{ win ? "YOU WIN" : "" }
			</section>
			<Stage width={levelDifficult.width} stage={stage} onCellClick={onClick} />
		</div>
	);
};

export default Game;
