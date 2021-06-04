import React, { useEffect } from "react"
import { Window } from "react-windows-xp"

import { GameContent } from "./styles"

import TileGrid from "~/components/TileGrid"
import ScoreBar from "~/components/ScoreBar"
import { useAppDispatch } from "~/store"
import { start } from "~/store/game/gameSlice"

const MinesweeperWindow: React.FC = () => {
    const dispatch = useAppDispatch()

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
            <GameContent>
                <ScoreBar />
                <TileGrid />
            </GameContent>
        </Window>
    )
}

export default MinesweeperWindow
