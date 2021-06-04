import { useEffect, useState } from "react"

import { useAppSelector } from "../store"
import { selectGameSlice } from "../store/game/gameSlice"

const useTimer = (): number => {
    const [time, setTime] = useState(0)
    const {
        isGameRunning,
        isGameOver,
        isGameWon,
    } = useAppSelector(selectGameSlice)

    useEffect(
        () => {
            let interval: NodeJS.Timeout

            if (!isGameOver && !isGameWon && !isGameRunning) {
                setTime(0)
            }

            if (isGameRunning) {
                interval = setInterval(
                    () => {
                        setTime(state => state + 1)
                    },
                    1000,
                )
            }

            return () => {
                clearInterval(interval)
            }
        },
        [isGameOver, isGameWon, isGameRunning]
    )

    return time
}

export default useTimer
