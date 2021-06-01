import React from "react"

import Cell from "../Cell"

const tileGrid = Array.from(Array(16)).map(() => Array.from(Array(16)))

const Minesweeper: React.FC = () => {
    return (
        <div
            style={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    borderRadius: "3px",
                    boxShadow: "0 0 10px 1px black",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column"
                    }}
                >
                    {tileGrid.map((cells, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                            }}
                        >
                            {cells.map((_, i) => (
                                <Cell key={i} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Minesweeper
