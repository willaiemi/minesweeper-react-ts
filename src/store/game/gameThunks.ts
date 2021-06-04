import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from "../index"
import { getRecursiveTilesToOpen } from "../../utils/gameHelpers"

import { openTile, gameOver } from "./gameSlice"
import { ITile, TileNature } from "./gameTypes"

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
            thunkAPI.dispatch(gameOver(tile))
            return
        }

        thunkAPI.dispatch(openTile(tile.coordinates))
    }
)
