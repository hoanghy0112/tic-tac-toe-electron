
import PageScaffold from "renderer/components/PageScaffold";
import Modal from "renderer/components/Modal/Modal";

import { boardMapSelector, winningStateSelector, currentMoveSelector, initializeMap, makeNewMove } from "renderer/features/boardMap";
import { configurationSelector } from "renderer/features/configuration";

import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { NONE, O, X } from "renderer/constants/board/cellType";
import { MAP_3, MAP_10, MAP_13 } from "renderer/constants/configuration/boardSize";

import X_icon from "../../../../assets/playpage/item/X.svg";
import O_icon from "../../../../assets/playpage/item/O.svg";

import './PlayPage.scss';

import React, { useEffect, useState } from "react";

const PlayPage = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [replayDialogue, setReplayDialogue] = useState(false);

	const {
		gameMode,
		boardSize
	} = useSelector(configurationSelector);

	const currentMove = useSelector(currentMoveSelector);

	const winningState = useSelector(winningStateSelector);
	let timeout;
	useEffect(() => {
		if (winningState.isWin) {
			timeout = setTimeout(() => {
				setReplayDialogue(true);
			}, 1000);
		}
	}, [winningState.isWin])
	// console.log('replay dialogue: ', replayDialogue);

	// const turnOffModal = () => {
	// 	clearTimeout(timeout);
	// 	setReplayDialogue(false);
	// }

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
		if (!winningState.isWin) dispatch(makeNewMove([x, y]))
	}

	return (
		<PageScaffold background={} previousPage="/choose-board-size">
			<div className="board" style={style}>
				{boardMap.map((row, indexX) => (
					<div className="board__row">
						{row.map((cell, indexY) => (
							<div
								className={`board__cell ${
									winningState.isWin
										? (() => {
											if (winningState.winCells.some(value =>
												JSON.stringify(value) == JSON.stringify({
													x: indexX,
													y: indexY
												}))) return "winning-cell";
											else return "";
										})()
										: ""
								}`}
								onClick={handleNewMove(indexX, indexY)}
							>
								<div className="board__cell__inner">
									{ cell == X && <img src={X_icon} /> }
									{ cell == O && <img src={O_icon} /> }
								</div>
							</div>
						))}
					</div>
				))}
			</div>
			{ winningState.isWin &&
				<Modal>
					<div className="winning-dialogue">
						<span>{ currentMove.type == X ? <img src={X_icon}/> : <img src={O_icon}/>} is the winner</span>
						<div className="replay-dialogue">
							Do you want to replay ?
							<div className="button-group">
								<button className="dialogue-btn" onClick={() => history.push('/choose-board-size')}>Yes</button>
								<button className="dialogue-btn" onClick={() => history.push('/')}>No</button>
							</div>
						</div>
					</div>
				</Modal>
			}
		</PageScaffold>
	)
}

export default PlayPage;
