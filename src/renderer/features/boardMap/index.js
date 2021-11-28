import { createSlice } from '@reduxjs/toolkit';

import * as BOARD_SIZE from 'renderer/constants/configuration/boardSize';
import * as CELL_TYPE from 'renderer/constants/board/cellType';

import { isValid, isEmpty } from '../boardMap/utils';

const boardMapSlice = createSlice({
	name: 'board',
	initialState: {
		boardMap: [],
		currentMove: CELL_TYPE.X,
		isNew: true,
	},
	reducers: {
		initializeMap: (state, action) => {
			const size = action.payload;
			state.boardMap = [
				...Array(size).fill([
					...Array(size).fill(CELL_TYPE.NONE),
				]),
			]
			state.currentMove = CELL_TYPE.X;
			state.isNew = false;
		},
		makeNewMove: (state, action) => {
			const [ y, x ] = action.payload;
			const type = state.currentMove == CELL_TYPE.X ? CELL_TYPE.O : CELL_TYPE.X;
			state.currentMove = type;
			if (isValid(x, y, state.boardSize) && isEmpty(x, y, state.boardMap))
				state.boardMap[x][y] = type;
		},
	},
});

export const { initializeMap, makeNewMove } = boardMapSlice.actions;

export const boardMapSelector = (state) => state.board.boardMap;
export const isNewSelector = state => state.board.isNew;
export const cellSelector = (x, y) => state => {
	if (isValid(x, y, state.board.boardSize)) return state.board.boardMap[x][y];
	return CELL_TYPE.INVALID;
}

export default boardMapSlice.reducer;
