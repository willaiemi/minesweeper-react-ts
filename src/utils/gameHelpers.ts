import { Coords, ITile, TileNature } from "~/store/game/gameTypes"

export const generateEmptyTileGrid = (horizontalLength: number, verticalLength: number): ITile[][] => (
    Array.from(Array(horizontalLength)).map((_, x) => Array.from(Array(verticalLength)).map((_, y) => ({
        isOpen: false,
        isFlagged: false,
        coordinates: { x, y },
        nature: TileNature.EMPTY,
    })))
)

export const getTilesAroundCoordinates = (coords: Coords, tiles: ITile[][]): ITile[] => {
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
