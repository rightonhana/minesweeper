import { MouseEvent } from "react";
import { useGame } from "../src/hooks/game.hook";
import { useStopwatch } from "../src/hooks/stopwatch.hook";
import styles from "./App.module.css";
import Alert from "./components/Alert/Alert";
import AppMenu from "./components/AppMenu/AppMenu";
import Game from "./components/Game";
import { EASY } from './constants/easy';
import LevelData from './types/LevelData';
import MinesweeperState from './types/MinesweeperState';
import Tuple from './types/Tuple';
import discoverEmptyZone from './utils/discoverEmptyZone';
import isGameComplete from './utils/isGameComplete';
import revealMines from './utils/mines/revealMines';
import minesNearby from './utils/minesNearby';
import setDiscovered from './utils/setDiscovered';
import when from "./utils/when";

/**TODO:
 * 		spread empty zone on click
 * 		onDiscover -> <button disable> attribute,
 * 		onDefeat -> disabled all buttons on stage
 * 		when a all cells discovered -> u should win... but for some reason you not -> clock still running
*/

function App() {
	const { timer, startStopwatch, pauseStopwatch, resetStopwatch } = useStopwatch(0);
	const { 
		stage,
		levelDifficult,
		firstClick,
		gameStarted,
		win,
		defeat,
		openAlert,
		alertClose,
		setStage,
		selectDifficult,
		toggleFlagCell,
		onFirstClick,
		onStartGame,
		onGameDefeat,
		onGameWin,
		updateCorrectFlags,
		allFlagsCorrect
	} = useGame(EASY);

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
		return revealMines(state)
	}
	
	const onChangeDifficult = (level: LevelData) => (event: MouseEvent<HTMLLIElement>) => {
		selectDifficult(level)
		resetStopwatch();
	}
	const discoverZone = (state: MinesweeperState[][], [x, y]: Tuple<number>) =>
		state[x][y].mine
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
			if (stage[x][y].flag) {
				updateCorrectFlags([x, y]);
				if (allFlagsCorrect()) {
					onWin();
				}
			}
		}
		if (event.button === 0) {
			updateCell([x, y]);
		}
	}

	return (
		<>
			<AppMenu
				timer={timer}
				gameStarted={gameStarted}
				resetGame={resetGame}
				startGame={startGame}
				onChangeDifficult={onChangeDifficult}
			/>
			<div className={styles.Stage}>
				<Game width={levelDifficult.width} stage={stage} onCellClick={onClick} />
			</div>
			{when(win, <Alert open={openAlert} message={"YOU WIN! 🎉"} handleClose={alertClose} />)}
			{when(defeat, <Alert open={openAlert} message={"YOU LOOSE 💀"} handleClose={alertClose} />)}
		</>
	);
}

export default App;
