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
    baseTiles: generateEmptyTileGrid(16, 16),
    bombs: [],
    isGameOver: false,
    isGameRunning: false,
    isGameWon: false,
    openedTiles: 0,
    flaggedTiles: 0,
}

export const gameSlice = createSlice({
    name: "game",
    initialState: INITIAL_STATE,
    reducers: {
        openTile: (state, action: PayloadAction<Coords>) => {
            const tile = state.tiles[action.payload.x][action.payload.y]
            if (!state.isGameOver && !state.isGameWon && !tile.isOpen) {
                state.isGameRunning = true
                tile.isOpen = true
                state.openedTiles += 1

                if (state.openedTiles >= (state.tiles[0].length * state.tiles.length) - state.numberOfBombs) {
                    state.isGameRunning = false
                    state.isGameWon = true

                    state.bombs.forEach(({ coordinates }) => {
                        state.tiles[coordinates.x][coordinates.y].isFlagged = true
                    })

                    state.flaggedTiles = state.numberOfBombs
                }
            }
        },
        toggleTileFlag: (state, action: PayloadAction<ITile>) => {
            if (!state.isGameOver && !state.isGameWon) {
                const {
                    coordinates,
                    isFlagged,
                } = action.payload

                state.tiles[coordinates.x][coordinates.y].isFlagged = !isFlagged

                if (isFlagged) {
                    state.flaggedTiles -= 1
                } else {
                    state.flaggedTiles += 1
                }
            }

        },
        gameOver: (state, { payload: { coordinates }}: PayloadAction<ITile>) => {
            state.isGameOver = true
            state.isGameRunning = false

            state.tiles[coordinates.x][coordinates.y].isDeathMine = true

            state.tiles.forEach(tileRow => tileRow.forEach(tile => {
                if (!(tile.nature === TileNature.BOMB) !== !tile.isFlagged) {
                    tile.isOpen = true
                }
            }))
        },
        start: state => {
            state.isGameOver = false
            state.isGameWon = false
            state.isGameRunning = false
            state.openedTiles = 0
            state.flaggedTiles = 0

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

export const { openTile, gameOver, start, toggleTileFlag } = gameSlice.actions

export const selectTiles = (state: RootState): ITile[][] => state.game.tiles
export const selectGameSlice = (state: RootState): GameState => state.game

export default gameSlice.reducer
