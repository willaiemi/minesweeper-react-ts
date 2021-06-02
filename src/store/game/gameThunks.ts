import { createAsyncThunk } from "@reduxjs/toolkit"

import { closeTile, openTile } from "./gameSlice"
import { Coords } from "./gameTypes"

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
