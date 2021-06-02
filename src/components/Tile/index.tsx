import React from "react"

import { useAppDispatch } from "~/store"
import { openAndCloseTile } from "~/store/game/gameThunks"
import { Coords } from "~/store/game/gameTypes"

interface Props {
    isOpen: boolean,
    coordinates: Coords,
}

const Tile: React.FC<Props> = ({
    isOpen,
    coordinates,
}) => {
    const dispatch = useAppDispatch()

    const onClickTile = () => {
        dispatch(openAndCloseTile(coordinates))
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
                background: isOpen ? "white" : "black",
                cursor: "pointer",
                transition: "0.4s",
            }}
            onClick={onClickTile}
        >
            {isOpen && "1"}
        </div>
    )
}

export default Tile
