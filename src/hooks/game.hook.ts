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
	const [correctFlags, setCorrectFlags] = useState<number>(0);
	const [win, setWin] = useState<boolean>(false);
	const [defeat, setDefeat] = useState<boolean>(false);
	const [openAlert, setOpenAlert] = useState(false);

	const alertOpen = () => {
		setOpenAlert(true);
	};

	const alertClose = () => {
		setOpenAlert(false);
	};

	const selectDifficult = (difficult: LevelData) => {
		setLevelDifficult(difficult);
		setFirstClick(true);
		setCorrectFlags(0);
		setGameStarted(false);
		setStage(createStage(difficult.width, difficult.height, INITIAL_STATE));
	}

	const onStartGame = () => {
		setFirstClick(true);
		setCorrectFlags(0);
		setDefeat(false);
		setWin(false);
		setGameStarted(true);
		setStage(createStage(levelDifficult.width, levelDifficult.height, INITIAL_STATE));
	}

	const onGameDefeat = () => {
		setDefeat(true);
		alertOpen();
		setGameStarted(false);
	}

	const onGameWin = () => {
		setWin(true);
		alertOpen();
		setGameStarted(false);
	}

	const updateCorrectFlags = ([x, y]: Tuple<number>) => {
		//TODO: on remove a correct flag we should setCorrectFlags(correctFlags - 1);
		if (stage[x][y].mine) {
			setCorrectFlags(correctFlags + 1);
		}
	}

	const allFlagsCorrect = () => {
		return correctFlags === levelDifficult.mines;
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
		console.log(minesPositions)
		const newStage = setMinesRadiuses(
			stage,
			minesPositions
		);
		const discover = discoverZone(newStage, [x, y]);
		setStage(discover);
		setFirstClick(false);
		setCorrectFlags(0);
		setGameStarted(true);
	}

	
	return {
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
	};
}

export default useGame;