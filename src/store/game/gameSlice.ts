import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit"

import { Coords, GameState, ITile, TileNature } from "./gameTypes"

import { RootState } from "~/store"
import { generateEmptyTileGrid, getTilesAroundCoordinates } from "~/utils/gameHelpers"

const INITIAL_STATE: GameState = {
    tiles: [],
    numberOfBombs: 40,
    numberOfHorizontalTiles: 16,
    numberOfVerticalTiles: 16,
    baseTiles: generateEmptyTileGrid(16, 16)
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

            const bombs = state.baseTiles
                .reduce((accumulator, current) => accumulator.concat(current), [])
                .sort(() => 0.5 - Math.random())
                .slice(0, state.numberOfBombs)

            const tiles = [...state.baseTiles]

            bombs.forEach(bombTile => {
                const {
                    coordinates: coords,
                } = bombTile

                const tilesAroundBomb = getTilesAroundCoordinates(coords, tiles)

                tilesAroundBomb.forEach(tile => {
                    const {
                        x,
                        y
                    } = tile.coordinates

                    tiles[x][y] = {
                        ...tile,
                        nature: tile.nature === TileNature.BOMB ? TileNature.BOMB : tile.nature + 1,
                    }
                })

                tiles[coords.x][coords.y] = {
                    ...bombTile,
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
