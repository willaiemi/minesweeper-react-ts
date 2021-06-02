import React from "react"

import Tile from "~/components/Tile"
import { useAppDispatch, useAppSelector } from "~/store"
import { start, selectTiles } from "~/store/game/gameSlice"

const Minesweeper: React.FC = () => {
    const tileGrid = useAppSelector(selectTiles)
    const dispatch = useAppDispatch()

    const resetGame = () => {
        dispatch(start())
    }

    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "3px",
                    boxShadow: "0 0 10px 1px black",
                }}
            >
                <button type="button" onClick={resetGame}>
                    Reset Tiles
                </button>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {tileGrid.map((tiles, x) => (
                        <div
                            key={x}
                            style={{
                                display: "flex",
                            }}
                        >
                            {tiles.map((tile, y) => (
                                <Tile
                                    key={`${x}:${y}`}
                                    tileData={tile}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Minesweeper
