import React from "react"
import { Wallpaper, Window } from "react-windows-xp"

import { CentralizeContent, GameContent, TileGridContainer } from "./styles"

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
        <Wallpaper>
            <CentralizeContent>
                <Window
                    title="Minesweeper"
                >
                    <GameContent>
                        <button type="button" onClick={resetGame}>
                            Reset Tiles
                        </button>
                        <TileGridContainer>
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
                        </TileGridContainer>
                    </GameContent>
                </Window>
            </CentralizeContent>
        </Wallpaper>
    )
}

export default Minesweeper
