import React, { MouseEvent, useState } from "react"

import { start } from "../../store/game/gameSlice"
import { RootState, useAppDispatch, useAppSelector } from "../../store"
import Counter from "../Counter"
import useTimer from "../../hooks/useTimer"
import { getRestartButtonImageProps } from "../../utils/imageHelpers"

import { RestartButton, ScoreBarContainer } from "./styles"

interface Props {
    isMouseDown: boolean;
}

const ScoreBar: React.FC<Props> = ({ isMouseDown }) => {
    const dispatch = useAppDispatch()
    const {
        isGameRunning,
        isGameOver,
        isGameWon,
        numberOfMines,
        flaggedTiles,
    } = useAppSelector((state: RootState) => state.game)
    const [isMouseDownOnRestartButton, setIsMouseDownOnRestartButton] = useState(false)
    const time = useTimer()

    const resetGame = () => {
        dispatch(start())
    }

    const onMouseDownOnRestartButton = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setIsMouseDownOnRestartButton(true)
    }

    const onMouseLeaveOrGoUp = () => {
        setIsMouseDownOnRestartButton(false)
    }

    const imageProps = getRestartButtonImageProps(isGameRunning, isGameOver, isGameWon, isMouseDown)

    return (
        <ScoreBarContainer>
            <Counter number={numberOfMines - flaggedTiles} />
            <RestartButton
                isMouseDown={isMouseDownOnRestartButton}
                onMouseDown={onMouseDownOnRestartButton}
                onMouseLeave={onMouseLeaveOrGoUp}
                onMouseUp={onMouseLeaveOrGoUp}
            >
                <button type="button" onClick={resetGame}>
                    <img {...imageProps} />
                </button>
            </RestartButton>
            <Counter number={time} />
        </ScoreBarContainer>
    )
}

export default ScoreBar
