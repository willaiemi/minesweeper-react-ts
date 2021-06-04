import React from "react"
import { Provider } from "react-redux"
import { Wallpaper } from "react-windows-xp"

import MinesweeperWindow from "./components/MinesweeperWindow"
import { CentralizeWindow } from "./styles"
import store from "./store"
import StartupScreen from "./components/StartupScreen"

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Wallpaper>
                <StartupScreen></StartupScreen>
                <CentralizeWindow>
                    <MinesweeperWindow />
                </CentralizeWindow>
            </Wallpaper>
        </Provider>
    )
}

export default App
