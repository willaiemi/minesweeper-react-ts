import styled, { css } from "styled-components"

import { styles } from "~/styles"

interface StyledTileProps {
    isOpen: boolean;
    isMouseDown: boolean;
}

export const StyledTile = styled.div<StyledTileProps>(
    ({ isOpen, isMouseDown }) => css`
        height: 16px;
        width: 16px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;

        & > img {
            position: absolute;
        }

        ${isOpen ? css`
            border-left: 1px solid ${styles.colors.MEDIUM_GRAY};
            border-top: 1px solid ${styles.colors.MEDIUM_GRAY};
        ` : css`
            ${styles.winXPElevatedBorderStyle}
            border-width: 2px;
        `}

        ${isMouseDown && css`
            &:hover {
                border: none;
                border-left: 1px solid ${styles.colors.MEDIUM_GRAY};
                border-top: 1px solid ${styles.colors.MEDIUM_GRAY};
            }
        `}
    `
)
