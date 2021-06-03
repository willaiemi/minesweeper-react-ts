import { createAsyncThunk } from "@reduxjs/toolkit"

import { openTile, gameOver } from "./gameSlice"
import { ITile, TileNature } from "./gameTypes"

import { RootState } from "~/store"
import { getRecursiveTilesToOpen } from "~/utils/gameHelpers"

export const openTileHandler = createAsyncThunk<void, ITile, { state: RootState }>(
    "game/openTileHandler",
    (tile, thunkAPI) => {
        if (tile.nature === TileNature.EMPTY) {
            const tilesToOpen = getRecursiveTilesToOpen(tile, thunkAPI.getState().game.tiles)

            tilesToOpen.forEach(tile => {
                thunkAPI.dispatch(openTile(tile.coordinates))
            })

            return
        }

        if (tile.nature === TileNature.BOMB) {
            thunkAPI.dispatch(gameOver())

            return
        }

        thunkAPI.dispatch(openTile(tile.coordinates))
    }
)
