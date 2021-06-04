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
    baseTiles: generateEmptyTileGrid(16, 16),
    bombs: [],
    isGameOver: false,
}

export const gameSlice = createSlice({
    name: "game",
    initialState: INITIAL_STATE,
    reducers: {
        openTile: (state, action: PayloadAction<Coords>) => {
            if (!state.isGameOver) {
                state.tiles[action.payload.x][action.payload.y].isOpen = true
            }
        },
        closeTile: (state, action: PayloadAction<Coords>) => {
            state.tiles[action.payload.x][action.payload.y].isOpen = false
        },
        toggleTileFlag: (state, action: PayloadAction<ITile>) => {
            if (!state.isGameOver) {
                const {
                    coordinates,
                    isFlagged,
                } = action.payload

                state.tiles[coordinates.x][coordinates.y].isFlagged = !isFlagged
            }

        },
        gameOver: (state, { payload: { coordinates }}: PayloadAction<ITile>) => {
            state.isGameOver = true

            state.tiles[coordinates.x][coordinates.y].isDeathMine = true

            state.tiles.forEach(tileRow => tileRow.forEach(tile => {
                if (!(tile.nature === TileNature.BOMB) !== !tile.isFlagged) {
                    tile.isOpen = true
                }
            }))
        },
        start: state => {
            state.isGameOver = false
            state.numberOfBombs = 15

            const bombs = state.baseTiles
                .reduce((accumulator, current) => accumulator.concat(current), [])
                .sort(() => 0.5 - Math.random())
                .slice(0, state.numberOfBombs)
                .map(bombTile => ({ ...bombTile }))

            const tiles = [...state.baseTiles].map(tileRow => [...tileRow])

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

            state.bombs = bombs
            state.tiles = tiles
        }
    }
})

export const { openTile, closeTile, gameOver, start, toggleTileFlag } = gameSlice.actions

export const selectTiles = (state: RootState): ITile[][] => state.game.tiles
export const selectBaseTiles = (state: RootState): ITile[][] => state.game.baseTiles
export const selectIsGameOver = (state: RootState): boolean => state.game.isGameOver

export default gameSlice.reducer
