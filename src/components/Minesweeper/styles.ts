import styled from "styled-components"

import { styles } from "~/styles"

export const CentralizeContent = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const GameContent = styled.div`
    ${styles.winXPElevatedBorderStyle}
    background-color: ${styles.colors.GAME_BACKGROUND};
    padding: 5px;
`

export const TileGridContainer = styled.div`
    ${styles.winXPLoweredBorderStyle}

    width: fit-content;
    background: rgb(192, 192, 192);
`
