import React from "react"
import { Provider } from "react-redux"

import Minesweeper from "./components/Minesweeper"
import store from "./store"

function App(): JSX.Element {
    return (
        <Provider store={store}>
            <Minesweeper />
        </Provider>
    )
}

export default App
