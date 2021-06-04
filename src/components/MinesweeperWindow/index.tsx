import React, { MouseEvent, useEffect, useState } from "react"
import { Window } from "react-windows-xp"

import TileGrid from "../TileGrid"
import ScoreBar from "../ScoreBar"
import { useAppDispatch, useAppSelector } from "../../store"
import { selectGameSlice, start } from "../../store/game/gameSlice"

import { GameContent } from "./styles"

const MinesweeperWindow: React.FC = () => {
    const dispatch = useAppDispatch()
    const { isGameOver, isGameWon } = useAppSelector(selectGameSlice)

    const [isMouseDown, setIsMouseDown] = useState(false)

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.button !== 0 || isGameOver || isGameWon) {
            return
        }

        setIsMouseDown(true)
    }

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.button !== 0) {
            return
        }

        setIsMouseDown(false)
    }

    useEffect(
        () => {
            dispatch(start())
        },
        [dispatch]
    )

    return (
        <Window
            title="Minesweeper"
        >
            <GameContent
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
            >
                <ScoreBar isMouseDown={isMouseDown} />
                <TileGrid isMouseDown={isMouseDown} />
            </GameContent>
        </Window>
    )
}

export default MinesweeperWindow
