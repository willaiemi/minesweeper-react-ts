import styled, { css } from "styled-components"

interface StartupScreenContainerProps {
    fadeOut: boolean;
}

export const StartupScreenContainer = styled.div<StartupScreenContainerProps>`
    width: 100vw;
    height: 100vh;
    background: wheat;
    position: absolute;
    transition: 1s;

    ${({ fadeOut }) => fadeOut && css`
        opacity: 0;
    `}
`

export const StartupHeader = styled.div`
    background: rgb(9, 33, 120);
    height: 13%;
    width: 100%;
`

export const StartupContent = styled.div`
    height: 72%;
    width: 100%;
    background: linear-gradient(to right, rgb(51, 73, 224) 0%, rgb(97, 126, 230) 47%,
        rgb(97, 126, 230) 53%, rgb(51, 73, 224) 100%);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & img {
        filter: hue-rotate(109deg);

        &:hover {
            filter: hue-rotate(109deg) brightness(1.1);
        }

        &:hover:active {
            filter: hue-rotate(109deg) brightness(0.8)
        }
    }

    & p {
        margin-block-start: 0.4em;
        margin-block-end: 0.4em;
        color: white;
        font-family: Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        font-size: 16px;
    }

    &::before {
        top: 0;
        right: 0;
        left: 0;
        position: absolute;
        height: 2px;
        width: 100%;
        content: "";
        background: linear-gradient(to right, transparent 0px, rgba(255, 255, 255, 0.5) 40%,
            rgba(255, 255, 255, 0.5) 60%, transparent 100%)
    }

    &::after {
        bottom: 0;
        right: 0;
        left: 0;
        position: absolute;
        height: 2px;
        width: 100%;
        content: "";
        background: linear-gradient(to right, transparent 0px, rgba(220, 152, 117) 40%,
            rgba(220, 152, 117) 60%, transparent 100%)
    }
`

export const StartupFooter = styled.div`
    background: rgb(9, 33, 120);
    height: 15%;
    width: 100%;
`
