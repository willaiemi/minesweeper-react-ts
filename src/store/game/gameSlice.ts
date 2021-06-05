import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit"

import { RootState } from "../index"
import { generateEmptyTileGrid, getTilesAroundCoordinates } from "../../utils/gameHelpers"

import { Coords, GameState, ITile, TileNature } from "./gameTypes"

const INITIAL_STATE: GameState = {
    tiles: [],
    numberOfMines: 40,
    baseTiles: generateEmptyTileGrid(16, 16),
    mines: [],
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

                if (state.openedTiles >= (state.tiles[0].length * state.tiles.length) - state.numberOfMines) {
                    state.isGameRunning = false
                    state.isGameWon = true

                    state.mines.forEach(({ coordinates }) => {
                        state.tiles[coordinates.x][coordinates.y].isFlagged = true
                    })

                    state.flaggedTiles = state.numberOfMines
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
                if (!(tile.nature === TileNature.MINE) !== !tile.isFlagged) {
                    tile.isOpen = true
                }
            }))
        },
        start: state => {
            const baseTilesFlat = state.baseTiles
                .reduce((accumulator, current) => accumulator.concat(current), [])

            const mines: ITile[] = []

            while (mines.length !== state.numberOfMines) {
                const randomNumber = Math.floor(Math.random() * (baseTilesFlat.length - 1))

                const [mine] = baseTilesFlat.splice(randomNumber, 1)

                mines.push({
                    ...mine
                })
            }

            const tiles = [...state.baseTiles].map(tileRow => [...tileRow])

            mines.forEach(mineTile => {
                const {
                    coordinates: coords,
                } = mineTile

                const tilesAroundMine = getTilesAroundCoordinates(coords, tiles)

                tilesAroundMine.forEach(tile => {
                    const {
                        x,
                        y
                    } = tile.coordinates

                    tiles[x][y] = {
                        ...tile,
                        nature: tile.nature === TileNature.MINE ? TileNature.MINE : tile.nature + 1,
                    }
                })

                tiles[coords.x][coords.y] = {
                    ...mineTile,
                    nature: TileNature.MINE,
                }
            })

            return {
                ...INITIAL_STATE,
                mines,
                tiles,
            }
        }
    }
})

export const { openTile, gameOver, start, toggleTileFlag } = gameSlice.actions

export const selectTiles = (state: RootState): ITile[][] => state.game.tiles
export const selectGameSlice = (state: RootState): GameState => state.game

export default gameSlice.reducer
