import styled from "styled-components"

import { styles } from "~/styles"

export const ScoreBarContainer = styled.div`
    ${styles.winXPLoweredBorderStyle}
    border-width: 2px;
    height: 34px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 3px 4px;
    box-sizing: border-box;
`

export const CounterContainer = styled.div`
    ${styles.winXPLoweredBorderStyle}
    border-width: 1px;
    border-top: none;
    border-left: none;
    width: 39px;
    display: flex;
    height: 23px;
`

export const RestartButton = styled.div`
    ${styles.winXPElevatedBorderStyle}
    border-width: 2px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    & > button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
        background: none;
        border: none;
        min-width: initial;
        min-height: initial;
        padding: initial;

        &:hover, &:active, &:focus {
            box-shadow: none;
            background: none;
        }
    }
`
