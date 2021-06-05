import { ITile, TileNature } from "../store/game/gameTypes"
import open1 from "../assets/open1.png"
import open2 from "../assets/open2.png"
import open3 from "../assets/open3.png"
import open4 from "../assets/open4.png"
import open5 from "../assets/open5.png"
import open6 from "../assets/open6.png"
import open7 from "../assets/open7.png"
import open8 from "../assets/open8.png"
import flag from "../assets/flag.png"
import mine from "../assets/mine-ceil.png"
import misflagged from "../assets/misflagged.png"
import deathMine from "../assets/mine-death.png"
import smile from "../assets/smile.png"
import ohh from "../assets/ohh.png"
import win from "../assets/win.png"
import dead from "../assets/dead.png"

interface ImageProps {
    src: string;
    alt: string;
}

const IMAGE_BY_NATURE = {
    [TileNature.ONE]: {
        src: open1,
        alt: "one"
    },
    [TileNature.TWO]: {
        src: open2,
        alt: "two"
    },
    [TileNature.THREE]: {
        src: open3,
        alt: "three"
    },
    [TileNature.FOUR]: {
        src: open4,
        alt: "four"
    },
    [TileNature.FIVE]: {
        src: open5,
        alt: "five"
    },
    [TileNature.SIX]: {
        src: open6,
        alt: "six"
    },
    [TileNature.SEVEN]: {
        src: open7,
        alt: "seven"
    },
    [TileNature.EIGHT]: {
        src: open8,
        alt: "eight"
    },
    [TileNature.MINE]: {
        src: mine,
        alt: "mine"
    },
    flag: {
        src: flag,
        alt: "flag"
    },
    misflagged: {
        src: misflagged,
        alt: "misflagged"
    },
    deathMine: {
        src: deathMine,
        alt: "death mine"
    }
}

export const getTileImageProps = (tile: ITile): ImageProps | null => {
    if (tile.isOpen && tile.isFlagged) {
        return IMAGE_BY_NATURE.misflagged
    }

    if (tile.isFlagged) {
        return IMAGE_BY_NATURE.flag
    }

    if (!tile.isOpen || tile.nature === TileNature.EMPTY) {
        return null
    }

    if (tile.isDeathMine) {
        return IMAGE_BY_NATURE.deathMine
    }

    return IMAGE_BY_NATURE[tile.nature]
}

export const getRestartButtonImageProps = (
    isGameRunning: boolean,
    isGameOver: boolean,
    isGameWon: boolean,
    isMouseDown: boolean,
): ImageProps => {
    if (isGameRunning && isMouseDown) {
        return {
            src: ohh,
            alt: "ohh"
        }
    }

    if (isGameOver) {
        return {
            src: dead,
            alt: "dead"
        }
    }

    if (isGameWon) {
        return {
            src: win,
            alt: "win"
        }
    }

    return {
        src: smile,
        alt: "smile"
    }
}
