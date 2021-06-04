import React, { MouseEvent, useState } from "react"

import { CounterContainer, RestartButton, ScoreBarContainer } from "./styles"

import smile from "~/assets/smile.png"
import ohh from "~/assets/ohh.png"
import win from "~/assets/win.png"
import dead from "~/assets/dead.png"
import digitZero from "~/assets/digit0.png"
import { start } from "~/store/game/gameSlice"
import { RootState, useAppDispatch, useAppSelector } from "~/store"

interface Props {
    isMouseDown: boolean;
}

const getImageProps = (
    isGameRunning: boolean,
    isGameOver: boolean,
    isGameWon: boolean,
    isMouseDown: boolean,
) => {
    if (isGameRunning && isMouseDown) {
        return {
            src: ohh,
            alt: "ohh"
        }
    }

    if (isGameOver) {
        return {
            src: dead,
            alt: "dead"
        }
    }

    if (isGameWon) {
        return {
            src: win,
            alt: "win"
        }
    }

    return {
        src: smile,
        alt: "smile"
    }
}

const ScoreBar: React.FC<Props> = ({ isMouseDown }) => {
    const dispatch = useAppDispatch()
    const {
        isGameRunning,
        isGameOver,
        isGameWon,
    } = useAppSelector((state: RootState) => state.game)
    const [isMouseDownOnRestartButton, setIsMouseDownOnRestartButton] = useState(false)

    const resetGame = () => {
        dispatch(start())
    }

    const onMouseDownOnRestartButton = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        setIsMouseDownOnRestartButton(true)
    }

    const onMouseLeave = () => {
        setIsMouseDownOnRestartButton(false)
    }

    const imageProps = getImageProps(isGameRunning, isGameOver, isGameWon, isMouseDown)

    return (
        <ScoreBarContainer>
            <CounterContainer>
                <img src={digitZero} />
                <img src={digitZero} />
                <img src={digitZero} />
            </CounterContainer>
            <RestartButton
                isMouseDown={isMouseDownOnRestartButton}
                onMouseDown={onMouseDownOnRestartButton}
                onMouseLeave={onMouseLeave}
            >
                <button type="button" onClick={resetGame}>
                    <img {...imageProps} />
                </button>
            </RestartButton>
            <CounterContainer>
                <img src={digitZero} />
                <img src={digitZero} />
                <img src={digitZero} />
            </CounterContainer>
        </ScoreBarContainer>
    )
}

export default ScoreBar
