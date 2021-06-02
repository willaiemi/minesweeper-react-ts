import React from "react"

import Tile from "~/components/Tile"
import { useAppSelector } from "~/store"
import { selectTiles } from "~/store/game/gameSlice"

const Minesweeper: React.FC = () => {
    const tileGrid = useAppSelector(selectTiles)

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
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {tileGrid.map((tiles: boolean[], x) => (
                        <div
                            key={x}
                            style={{
                                display: "flex",
                            }}
                        >
                            {tiles.map((tile, y) => (
                                <Tile
                                    key={`${x}:${y}`}
                                    isOpen={tile}
                                    coordinates={{ x, y }}
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
