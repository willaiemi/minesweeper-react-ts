import { createAsyncThunk } from "@reduxjs/toolkit"

import { closeTile, openTile } from "./gameSlice"
import { Coords, ITile, TileNature } from "./gameTypes"

export const openAndCloseTile = createAsyncThunk<void, Coords>(
    "game/openAndCloseTile",
    async (coordinates, thunkAPI) => {
        thunkAPI.dispatch(openTile(coordinates))

        return await new Promise((resolve) => {
            setTimeout(
                () => {
                    thunkAPI.dispatch(closeTile(coordinates))
                    resolve()
                },
                2000
            )
        })
    }
)

export const openTileHandler = createAsyncThunk<void, ITile>(
    "game/openTileHandler",
    // eslint-disable-next-line require-await
    async (tile, thunkAPI) => {
        if (tile.nature === TileNature.EMPTY) {
            // eslint-disable-next-line no-console
            console.log("Vazio:", tile.nature)
        }

        if (tile.nature === TileNature.BOMB) {
            // eslint-disable-next-line no-console
            console.log("Bomba!!!", tile.nature)
        }

        thunkAPI.dispatch(openTile(tile.coordinates))
    }
)
