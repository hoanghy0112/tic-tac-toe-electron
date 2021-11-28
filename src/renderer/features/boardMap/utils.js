
import { NONE } from "renderer/constants/board/cellType";

export const isValid = (x, y, size) => {
	if (x < 0 || y < 0) return false;
	if (x >= size || y >= size) return false;
	return true;
}

export const isEmpty = (x, y, boardMap) => {
	if (isValid(x, y, boardMap.length) && boardMap[x][y] == NONE) return true;
	else return false;
}
