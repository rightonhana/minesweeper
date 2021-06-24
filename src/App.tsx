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
import cellsDiscovered from "./utils/cellsDiscovered";
import discoverEmptyZone from './utils/discoverEmptyZone';
import isGameComplete from './utils/isGameComplete';
import revealMines from './utils/mines/revealMines';
import minesNearby from './utils/minesNearby';
import setDiscovered from './utils/setDiscovered';

/**TODO:
 * 		spread empty zone on click
 * 		onDiscover -> <button disable> attribute,
 * 		onDefeat -> disabled all buttons on stage
*/

function App() {
	const { timer, startStopwatch, pauseStopwatch, resetStopwatch } = useStopwatch(0);
	const { 
		stage,
		levelDifficult,
		firstClick,
		gameStarted,
		defeat,
		setStage,
		selectDifficult,
		toggleFlagCell,
		onFirstClick,
		onStartGame,
		onResetGame,
		onGameDefeat,
		onGameWin,
		currentCorrectFlags
	} = useGame(EASY);

	
	const startGame = () => {
		onStartGame();
		resetStopwatch();
		startStopwatch();
	}
	
	const resetGame = () => {
		onResetGame();
		resetStopwatch();
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
		}
		if (event.button === 0) {
			updateCell([x, y]);
		}
	}

	const cellsWithoutMines = (levelDifficult.height * levelDifficult.width) - levelDifficult.mines;

	const win = cellsDiscovered(stage) === cellsWithoutMines || currentCorrectFlags === levelDifficult.mines;
	
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
			<Alert open={win} message={"YOU WIN! 🎉"} handleClose={resetGame} />
			<Alert open={defeat} message={"YOU LOOSE 💀"} handleClose={resetGame} />
		</>
	);
}

export default App;
