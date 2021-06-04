import React, { MouseEvent, useEffect, useState } from "react"
import { Window } from "react-windows-xp"

import { GameContent } from "./styles"

import TileGrid from "~/components/TileGrid"
import ScoreBar from "~/components/ScoreBar"
import { useAppDispatch } from "~/store"
import { start } from "~/store/game/gameSlice"

const MinesweeperWindow: React.FC = () => {
    const dispatch = useAppDispatch()

    const [isMouseDown, setIsMouseDown] = useState(false)

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.button !== 0) {
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
                <ScoreBar />
                <TileGrid isMouseDown={isMouseDown} />
            </GameContent>
        </Window>
    )
}

export default MinesweeperWindow
