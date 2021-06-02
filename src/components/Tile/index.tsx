import React, { useState } from "react"

const Tile: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openTile = () => setIsOpen(true)

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
            onClick={openTile}
        >
            {isOpen && "1"}
        </div>
    )
}

export default Tile
