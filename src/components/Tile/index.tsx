import React, { MouseEvent } from "react"

import { useAppDispatch } from "../../store"
import { openTileHandler } from "../../store/game/gameThunks"
import { toggleTileFlag } from "../../store/game/gameSlice"
import { ITile } from "../../store/game/gameTypes"
import { getTileImageProps } from "../../utils/imageHelpers"

import { StyledTile } from "./styles"

interface Props {
    tileData: ITile,
    isMouseDown: boolean;
}

const Tile: React.FC<Props> = ({
    tileData,
    isMouseDown,
}) => {
    const dispatch = useAppDispatch()

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault()
        if (e.button !== 0) {
            return
        }

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

    const imageData = getTileImageProps(tileData)

    return (
        <StyledTile
            isOpen={tileData.isOpen}
            isMouseDown={isMouseDown}
            onMouseUp={onMouseUp}
            onContextMenu={onRightClick}
        >
            {imageData && (
                <img src={imageData.src} alt={imageData.alt} />
            )}
        </StyledTile>
    )
}

export default Tile
