import React from "react"

import { TileGridContainer } from "./styles"

import Tile from "~/components/Tile"
import { useAppSelector } from "~/store"
import { selectTiles } from "~/store/game/gameSlice"

const TileGrid: React.FC = () => {
    const tiles = useAppSelector(selectTiles)

    return (
        <TileGridContainer>
            {tiles.map((tileRow, x) => (
                <div
                    key={x}
                    style={{
                        display: "flex",
                    }}
                >
                    {tileRow.map((tile, y) => (
                        <Tile
                            key={`${x}:${y}`}
                            tileData={tile}
                        />
                    ))}
                </div>
            ))}
        </TileGridContainer>
    )
}

export default TileGrid
