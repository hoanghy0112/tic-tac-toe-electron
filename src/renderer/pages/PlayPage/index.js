
import PageScaffold from "renderer/components/PageScaffold";

import { boardMapSelector, isNewSelector, initializeMap, makeNewMove } from "renderer/features/boardMap";
import { configurationSelector } from "renderer/features/configuration";

import { useSelector, useDispatch } from "react-redux";
import { NONE, O, X } from "renderer/constants/board/cellType";
import { MAP_3, MAP_10, MAP_13 } from "renderer/constants/configuration/boardSize";

import X_icon from "../../../../assets/playpage/item/X.svg";
import O_icon from "../../../../assets/playpage/item/O.svg";

import './PlayPage.scss';

import React, { useEffect, useState } from "react";

const PlayPage = React.memo(() => {
	const dispatch = useDispatch();

	const {
		gameMode,
		boardSize
	} = useSelector(configurationSelector);

	const isNew = useSelector(isNewSelector);

	const [style, setStyle] = useState();

	useEffect(() => {
		dispatch(initializeMap(boardSize));

		switch (boardSize) {
			case MAP_3:
				setStyle({
					"--gap": "20px",
					"--size": "100px",
					"--border-radius": "15px",
					"--color": "#A0C4FF",
				})
				break;
			case MAP_10:
				setStyle({
					"--gap": "6px",
					"--size": "40px",
					"--border-radius": "5px",
					"--color": "#BDB2FF",
				})
				break;
			case MAP_13:
				setStyle({
					"--gap": "5px",
					"--size": "30px",
					"--border-radius": "5px",
					"--color": "#B5E48C",
				})
				break;
		}
	}, [boardSize]);
	const boardMap = useSelector(boardMapSelector);

	const handleNewMove = (x, y) => () => {
		dispatch(makeNewMove([x, y]))
	}

	return (
		<PageScaffold background={} previousPage="/choose-board-size">
			<div className="board" style={style}>
				{boardMap.map((row, indexY) => (
					<div className="board__row">
						{row.map((cell, indexX) => (
							<div onClick={handleNewMove(indexX, indexY)} className="board__cell">
								<div className="board__cell__inner">
									{ cell == X && <img src={X_icon} /> }
									{ cell == O && <img src={O_icon} /> }
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</PageScaffold>
	)
})

export default PlayPage;
