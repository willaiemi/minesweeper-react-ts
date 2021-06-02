export type Tile = boolean

export interface Coords {
    x: number,
    y: number,
}

export interface GameState {
    tiles: Tile[][],
}
