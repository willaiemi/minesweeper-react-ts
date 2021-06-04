import React from "react"
import { Provider } from "react-redux"
import { Wallpaper } from "react-windows-xp"

import MinesweeperWindow from "./components/Minesweeper"
import { CentralizeWindow } from "./styles"
import store from "./store"

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Wallpaper>
                <CentralizeWindow>
                    <MinesweeperWindow />
                </CentralizeWindow>
            </Wallpaper>
        </Provider>
    )
}

export default App
