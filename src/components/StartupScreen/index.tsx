import React, { MouseEvent, useState } from "react"

import shutdown from "../../assets/shutdown.png"

import { StartupContent, StartupFooter, StartupHeader, StartupScreenContainer } from "./styles"

const windowsXPStartupSound = `${process.env.PUBLIC_URL}/winxp.mp3`

const audio = new Audio(windowsXPStartupSound)

const StartupScreen: React.FC = () => {
    const [showStartupScreen, setShowStartupScreen] = useState(true)
    const [fadeOut, setFadeOut] = useState(false)

    const startWindowsXP = (e: MouseEvent<HTMLImageElement>) => {
        e.stopPropagation()
        e.preventDefault()
        audio.volume = 1
        audio.play()

        setFadeOut(true)

        setTimeout(() => {
            setShowStartupScreen(false)
        }, 1000)
    }
    if (showStartupScreen) {
        return (
            <StartupScreenContainer fadeOut={fadeOut}>
                <StartupHeader>
                </StartupHeader>
                <StartupContent>
                    <img onClick={startWindowsXP} src={shutdown} alt="shutdown" />
                    <p>Turn on</p>
                </StartupContent>
                <StartupFooter>
                </StartupFooter>
            </StartupScreenContainer>
        )
    }
    return null
}

export default StartupScreen
