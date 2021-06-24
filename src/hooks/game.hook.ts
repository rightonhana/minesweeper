import { useState } from "react";
import { EASY } from "../constants/easy";
import { INITIAL_STATE } from "../constants/initialState";
import LevelData from "../types/LevelData";
import MinesweeperState from "../types/MinesweeperState";
import Tuple from "../types/Tuple";
import createStage from "../utils/createStage";
import discoverZone from "../utils/discoverZone";
import flagsUsed from "../utils/flag/flagsUsed";
import toggleFlagValue from "../utils/flag/toggleFlagValue";
import generateMinesPositions from "../utils/mines/generateMinesPositions";
import setMinesRadiuses from "../utils/mines/setMinesRadiuses";

export const useGame = (level = EASY,) => {
	const [levelDifficult, setLevelDifficult] = useState<LevelData>(level);
	const [stage, setStage] = useState<MinesweeperState[][]>(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	const [firstClick, setFirstClick] = useState<boolean>(true);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [defeat, setDefeat] = useState<boolean>(false);

	const selectDifficult = (difficult: LevelData) => {
		setLevelDifficult(difficult);
		setFirstClick(true);
		setGameStarted(false);
		setStage(createStage(difficult.width, difficult.height, INITIAL_STATE));
	}

	const onStartGame = () => {
		setFirstClick(true);
		setDefeat(false);
		setGameStarted(true);
		setStage(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	}

	const onResetGame = () => {
		setFirstClick(true);
		setDefeat(false);
		setGameStarted(false);
		setStage(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	}

	const onGameDefeat = () => {
		setDefeat(true);
		setGameStarted(false);
	}

	const onGameWin = () => {
		setGameStarted(false);
	}
	
	const toggleFlagCell = ([x, y]: Tuple<number>) => {
		if (flagsUsed(stage) <= levelDifficult.mines || stage[x][y].flag) {
			setStage(toggleFlagValue(stage, [x, y]));
		}
	}
	
	const onFirstClick = ([x, y]: Tuple<number>) => {
		const minesPositions = generateMinesPositions(
			levelDifficult.width,
			levelDifficult.height,
			levelDifficult.mines,
			[x, y]
		);
		const newStage = setMinesRadiuses(
			stage,
			minesPositions
		);
		const discover = discoverZone(newStage, [x, y]);
		setStage(discover);
		setFirstClick(false);
		setGameStarted(true);
	}

	const currentCorrectFlags = stage.reduce((total: number, current: MinesweeperState[]) => {
		return total + current.reduce((accumulator: number, cell: MinesweeperState) => {
			return cell.mine && cell.flag ? accumulator += 1 : accumulator;
		}, 0) ;
	}, 0);
	
	return {
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
	};
}

export default useGame;