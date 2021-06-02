export enum TileNature {
    EMPTY,
    ONE,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    BOMB,
}

export interface Coords {
    x: number;
    y: number;
}

export interface ITile {
    isOpen: boolean;
    nature: TileNature;
    coordinates: Coords;
}

export interface GameState {
    tiles: ITile[][];
    numberOfBombs: number;
    baseTiles: ITile[][];
    numberOfHorizontalTiles: number;
    numberOfVerticalTiles: number;
}
