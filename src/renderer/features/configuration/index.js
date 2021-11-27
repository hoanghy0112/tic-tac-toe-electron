import { createSlice } from '@reduxjs/toolkit';

import * as gameMode from 'renderer/constants/configuration/gameMode';
import * as boardSize from 'renderer/constants/configuration/boardSize';

const configurationSlice = createSlice({
	name: 'configuration',
	initialState: {
		gameMode: gameMode.OFFLINE,
		boardSize: boardSize.MAP_3,
	},
	reducers: {
		setGameMode: (state, action) => {
			state.gameMode = action.payload;
		},
		setBoardSize: (state, action) => {
			state.boardSize = action.payload;
		}
	},
});

export const {
	setGameMode,
	setBoardSize
} = configurationSlice.actions;

export const gameModeSelector = (state) => state.configuration.gameMode;
export const boardSizeSelector = (state) => state.configuration.boardSize;

export default configurationSlice.reducer;
