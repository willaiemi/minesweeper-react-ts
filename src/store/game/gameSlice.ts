import {
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit"

import { Coords, GameState, Tile } from "./gameTypes"

import { RootState } from "~/store"

const INITIAL_STATE: GameState = {
    tiles: Array.from(Array(16)).map(() => Array.from(Array(16).map(() => false)))
}

export const gameSlice = createSlice({
    name: "game",
    initialState: INITIAL_STATE,
    reducers: {
        openTile: (state, action: PayloadAction<Coords>) => {
            state.tiles[action.payload.x][action.payload.y] = true
        },
        closeTile: (state, action: PayloadAction<Coords>) => {
            state.tiles[action.payload.x][action.payload.y] = false
        },
    }
})

export const { openTile, closeTile } = gameSlice.actions

export const selectTiles = (state: RootState): Tile[][] => state.game.tiles

export default gameSlice.reducer
