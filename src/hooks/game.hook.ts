import { useState } from "react";
import { EASY } from "../constants/easy";
import { INITIAL_STATE } from "../constants/initialState";
import LevelData from "../types/LevelData";
import MinesweeperState from "../types/MinesweeperState";
import Tuple from "../types/Tuple";
import generateBombsPositions from "../utils/bombs/generateBombsPositions";
import setBombsRadiuses from "../utils/bombs/setBombRadiuses";
import createStage from "../utils/createStage";
import discoverZone from "../utils/discoverZone";
import flagsUsed from "../utils/flag/flagsUsed";
import toggleFlagValue from "../utils/flag/toggleFlagValue";

export const useGame = (level = EASY,) => {
	const [levelDifficult, setLevelDifficult] = useState<LevelData>(level);
	const [stage, setStage] = useState<MinesweeperState[][]>(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	const [firstClick, setFirstClick] = useState<boolean>(true);
	const [gameStarted, setGameStarted] = useState<boolean>(false);
	const [win, setWin] = useState<boolean>(false);
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
		setWin(false);
		setGameStarted(true);
		setStage(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	}

	const onGameDefeat = () => {
		setDefeat(true);
		setGameStarted(false);
	}

	const onGameWin = () => {
		setWin(true);
		setGameStarted(false);
	}

	const toggleFlagCell = ([x, y]: Tuple<number>) => {
		if (flagsUsed(stage) <= levelDifficult.bombs || stage[x][y].flag) {
			setStage(toggleFlagValue(stage, [x, y]));
		}
	}

	const onFirstClick = ([x, y]: Tuple<number>) => {
		const bombsPositions = generateBombsPositions(
			levelDifficult.width,
			levelDifficult.height,
			levelDifficult.bombs,
			[x, y]
		);
		const newStage = setBombsRadiuses(
			stage,
			bombsPositions
		);
		const discover = discoverZone(newStage, [x, y]);
		setStage(discover);
		setFirstClick(false);
		setGameStarted(true);
	}

	
	return {
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
	};
}

export default useGame;