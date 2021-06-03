import { createAsyncThunk } from "@reduxjs/toolkit"

import { closeTile, openTile } from "./gameSlice"
import { Coords, ITile, TileNature } from "./gameTypes"

import { RootState } from "~/store"
import { getTilesAroundCoordinates } from "~/utils/gameHelpers"

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

export const getRecursiveTilesToOpen = (firstTile: ITile, tiles: ITile[][]): ITile[] => {
    const tilesCopy = tiles.map(tileList => [...tileList])

    const tilesThatShouldOpen: ITile[] = [firstTile]

    function findTilesNotOpenedAround(tileCoords: Coords) {
        const tilesNotAlreadyFoundAround = getTilesAroundCoordinates(tileCoords, tilesCopy)
            .filter(tile => !tilesThatShouldOpen.includes(tile))

        tilesThatShouldOpen.push(...tilesNotAlreadyFoundAround)

        tilesNotAlreadyFoundAround.filter(tile => tile.nature === TileNature.EMPTY).forEach(tile => {
            findTilesNotOpenedAround(tile.coordinates)
        })
    }

    findTilesNotOpenedAround(firstTile.coordinates)

    return tilesThatShouldOpen
}

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
            thunkAPI.dispatch(openTile(tile.coordinates))

            return
        }

        thunkAPI.dispatch(openTile(tile.coordinates))
    }
)
