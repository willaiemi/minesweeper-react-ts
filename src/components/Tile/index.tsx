import React from "react"

import { useAppDispatch } from "~/store"
import { openTileHandler } from "~/store/game/gameThunks"
import { ITile, TileNature } from "~/store/game/gameTypes"

interface Props {
    tileData: ITile,
}

const getValueByNature = (nature: TileNature) => {
    switch (nature) {
        case TileNature.EMPTY:
            return ""
        case TileNature.ONE:
        case TileNature.TWO:
        case TileNature.THREE:
        case TileNature.FOUR:
        case TileNature.FIVE:
        case TileNature.SIX:
        case TileNature.SEVEN:
        case TileNature.EIGHT:
        case TileNature.NINE:
            return nature
        case TileNature.BOMB:
            return "💣"
    }
}

const Tile: React.FC<Props> = ({
    tileData,
}) => {
    const dispatch = useAppDispatch()

    const onClickTile = () => {
        dispatch(openTileHandler(tileData))
    }

    return (
        <div
            style={{
                height: "30px",
                width: "30px",
                boxSizing: "border-box",
                border: "1px solid #777",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: tileData.isOpen ? "white" : "black",
                cursor: "pointer",
                transition: "0.4s",
            }}
            onClick={onClickTile}
        >
            {tileData.isOpen && getValueByNature(tileData.nature)}
        </div>
    )
}

export default Tile
