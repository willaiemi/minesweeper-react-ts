import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit"

import { Coords, GameState, ITile, TileNature } from "./gameTypes"

import { RootState } from "~/store"

const INITIAL_STATE: GameState = {
    tiles: [],
    numberOfBombs: 40,
    numberOfHorizontalTiles: 16,
    numberOfVerticalTiles: 16,
    baseTiles: []
}

export const gameSlice = createSlice({
    name: "game",
    initialState: INITIAL_STATE,
    reducers: {
        openTile: (state, action: PayloadAction<Coords>) => {
            state.tiles[action.payload.x][action.payload.y].isOpen = true
        },
        closeTile: (state, action: PayloadAction<Coords>) => {
            state.tiles[action.payload.x][action.payload.y].isOpen = false
        },
        start: state => {
            state.numberOfBombs = 40

            const baseTiles = Array.from(Array(16)).map((_, x) => Array.from(Array(16)).map((_, y) => ({
                isOpen: true,
                coordinates: { x, y },
                nature: TileNature.EMPTY,
            })))

            const bombs = baseTiles.flat(1).sort(() => 0.5 - Math.random()).slice(0, state.numberOfBombs)
            const tiles = [...baseTiles]

            bombs.forEach(bombsTile => {
                const {
                    coordinates: coords,
                } = bombsTile

                const startX = !coords.x ? 0 : coords.x - 1
                const startY = !coords.y ? 0 : coords.y - 1
                const endX = coords.x + 1 < state.numberOfHorizontalTiles ? coords.x + 1 : coords.x
                const endY = coords.y + 1 < state.numberOfVerticalTiles ? coords.y + 1 : coords.y

                for (let currentX = startX; currentX <= endX; currentX++) {
                    for (let currentY = startY; currentY <= endY; currentY++) {
                        const currentTile = tiles[currentX][currentY]
                        tiles[currentX][currentY] = {
                            ...currentTile,
                            nature: currentTile.nature === TileNature.BOMB ? TileNature.BOMB : currentTile.nature + 1,
                        }
                    }
                }

                tiles[coords.x][coords.y] = {
                    ...bombsTile,
                    nature: TileNature.BOMB,
                }
            })

            state.tiles = tiles
        }
    }
})

export const { openTile, closeTile, start } = gameSlice.actions

export const selectTiles = (state: RootState): ITile[][] => state.game.tiles

export default gameSlice.reducer
