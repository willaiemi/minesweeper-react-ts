import styled, { css } from "styled-components"

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

interface RestartButtonProps {
    isMouseDown: boolean;
}

export const RestartButton = styled.div<RestartButtonProps>`
    ${styles.winXPElevatedBorderStyle}
    border-width: 2px;
    box-sizing: border-box;
    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isMouseDown }) => isMouseDown && css`
        &:hover {
            border: 1px solid ${styles.colors.MEDIUM_GRAY};
            border-top-width: 2px;
            border-left-width: 2px;
        }

    `}

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
