import { createAsyncThunk } from "@reduxjs/toolkit"

import { RootState } from ".."

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

const getTilesAroundCoordinates = (coords: Coords, tiles: ITile[][]): ITile[] => {
    const startX = !coords.x ? 0 : coords.x - 1
    const startY = !coords.y ? 0 : coords.y - 1
    const endX = coords.x + 1 < tiles[0].length ? coords.x + 1 : coords.x
    const endY = coords.y + 1 < tiles.length ? coords.y + 1 : coords.y

    const tilesAroundCoordinates = []

    for (let currentX = startX; currentX <= endX; currentX++) {
        for (let currentY = startY; currentY <= endY; currentY++) {
            if (currentX === coords.x && currentY === coords.y) {
                continue
            }

            tilesAroundCoordinates.push(tiles[currentX][currentY])
        }
    }
    return tilesAroundCoordinates
}

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
