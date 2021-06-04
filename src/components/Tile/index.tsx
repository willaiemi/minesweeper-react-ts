import React, { MouseEvent } from "react"

import { StyledTile } from "./styles"

import { useAppDispatch, useAppSelector } from "~/store"
import { openTileHandler } from "~/store/game/gameThunks"
import { selectIsGameOver, toggleTileFlag } from "~/store/game/gameSlice"
import { ITile, TileNature } from "~/store/game/gameTypes"
import open1 from "~/assets/open1.png"
import open2 from "~/assets/open2.png"
import open3 from "~/assets/open3.png"
import open4 from "~/assets/open4.png"
import open5 from "~/assets/open5.png"
import open6 from "~/assets/open6.png"
import open7 from "~/assets/open7.png"
import open8 from "~/assets/open8.png"
import flag from "~/assets/flag.png"
import mine from "~/assets/mine-ceil.png"
import misflagged from "~/assets/misflagged.png"
import deathMine from "~/assets/mine-death.png"

interface Props {
    tileData: ITile,
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
    [TileNature.BOMB]: {
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
    deathBomb: {
        src: deathMine,
        alt: "death mine"
    }
}

const getImageProps = (tile: ITile, isGameOver: boolean) => {
    if (isGameOver && tile.isOpen && tile.isFlagged) {
        return IMAGE_BY_NATURE.misflagged
    }

    if (tile.isFlagged) {
        return IMAGE_BY_NATURE.flag
    }

    if (!tile.isOpen || tile.nature === TileNature.EMPTY) {
        return null
    }

    if (tile.isDeathMine) {
        return IMAGE_BY_NATURE.deathBomb
    }

    return IMAGE_BY_NATURE[tile.nature]

}

const Tile: React.FC<Props> = ({
    tileData,
}) => {
    const dispatch = useAppDispatch()
    const isGameOver = useAppSelector(selectIsGameOver)

    const onClickTile = () => {
        if (tileData.isFlagged || tileData.isOpen) {
            return
        }

        dispatch(openTileHandler(tileData))
    }

    const onRightClick = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (tileData.isOpen) {
            return
        }

        dispatch(toggleTileFlag(tileData))
    }

    const imageData = getImageProps(tileData, isGameOver)

    return (
        <StyledTile
            isOpen={tileData.isOpen}
            onClick={onClickTile}
            onContextMenu={onRightClick}
        >
            {imageData && (
                <img src={imageData.src} alt={imageData.alt} />
            )}
        </StyledTile>
    )
}

export default Tile
