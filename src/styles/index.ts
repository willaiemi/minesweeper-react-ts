import { css } from "styled-components"

const colors = {
    LIGHT_GRAY: "rgb(245, 245, 245)",
    MEDIUM_GRAY: "rgb(128, 128, 128)",
    GAME_BACKGROUND: "rgb(192, 192, 192)",
}

const winXPLoweredBorderStyle = css`
    border-width: 3px;
    border-style: solid;
    border-color: ${colors.MEDIUM_GRAY} ${colors.LIGHT_GRAY} ${colors.LIGHT_GRAY} ${colors.MEDIUM_GRAY};
`

const winXPElevatedBorderStyle = css`
    border-width: 3px;
    border-style: solid;
    border-color: ${colors.LIGHT_GRAY} ${colors.MEDIUM_GRAY} ${colors.MEDIUM_GRAY} ${colors.LIGHT_GRAY};
`

export const styles = {
    colors,
    winXPElevatedBorderStyle,
    winXPLoweredBorderStyle
}
