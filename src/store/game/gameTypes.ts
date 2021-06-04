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
    isFlagged: boolean;
    isDeathMine?: boolean;
}

export interface GameState {
    tiles: ITile[][];
    numberOfBombs: number;
    baseTiles: ITile[][];
    numberOfHorizontalTiles: number;
    numberOfVerticalTiles: number;
    bombs: ITile[];
    isGameOver: boolean;
}
