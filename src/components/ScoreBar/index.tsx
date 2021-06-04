import React from "react"

import { CounterContainer, RestartButton, ScoreBarContainer } from "./styles"

import smile from "~/assets/smile.png"
import digitZero from "~/assets/digit0.png"
import { start } from "~/store/game/gameSlice"
import { useAppDispatch } from "~/store"

const ScoreBar: React.FC = () => {

    const dispatch = useAppDispatch()

    const resetGame = () => {
        dispatch(start())
    }

    return (
        <ScoreBarContainer>
            <CounterContainer>
                <img src={digitZero} />
                <img src={digitZero} />
                <img src={digitZero} />
            </CounterContainer>
            <RestartButton>
                <button type="button" onClick={resetGame}>
                    <img src={smile} />
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
