import React from "react"

import { TileGridContainer } from "./styles"

import Tile from "~/components/Tile"
import { useAppSelector } from "~/store"
import { selectTiles } from "~/store/game/gameSlice"

interface Props {
    isMouseDown: boolean;
}

const TileGrid: React.FC<Props> = ({ isMouseDown }) => {
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
                            isMouseDown={isMouseDown}
                        />
                    ))}
                </div>
            ))}
        </TileGridContainer>
    )
}

export default TileGrid
