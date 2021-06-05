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
    MINE,
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
    numberOfMines: number;
    baseTiles: ITile[][];
    mines: ITile[];
    isGameOver: boolean;
    isGameWon: boolean;
    isGameRunning: boolean;
    openedTiles: number;
    flaggedTiles: number;
}
